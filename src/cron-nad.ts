import { schedule as ScheduleNodeCron ,validate} from 'node-cron';
import { logger } from './utils/logger';
import { DailySchedule, MonthlySchedule, TMeridiemBasis, TMonthlyBasis, TNadSchedule, TTimeBasis, TYearlyBasis, YearlySchedule } from './types';
import { expressions } from './constants';

export * from './types'

type TSchedulesWithExpression = {
  name:string,
  basis:string,
  event:string,
  frequent:string,
  at:string,
  time:string,
  disable:boolean,
  logging:boolean,
  expression:string
  callback:()=>void
}

export class NadScheduler {
  private schedules: TSchedulesWithExpression[] = [];
  constructor(options: TNadSchedule[]) {
    this.schedules = this.generateSchedulesWithExpression(options);
    this.logRegisteredSchedules(this.schedules);
  }

  private generateExpression = (
    schedule: TNadSchedule
  ): string => {
    const {config} = schedule
    const {basis,event} = config
    let expression = expressions[event] ?? '* * * * *';
    switch (basis) {
      case 'MINUTES':
      case 'HOURLY':
        return expression;
      default:
        const {time,at,frequent} = config as DailySchedule|MonthlySchedule|YearlySchedule
        if(time && at){
          const generatedTimeNumber = this.generateTimeNumber(time, at);
          const parts = expression.split(' ');
          parts[1] = generatedTimeNumber.toString();
          return parts.join(' ');
        }
        if(frequent){
          const currentParts = expression.split(' ');
          const frequentParts = ((expressions[frequent] ?? expression) as string).split(' ')
          currentParts[0] = frequentParts[0];
          currentParts[1] = frequentParts[1];
          return currentParts.join(' ')
        }
        return expression
    }
  };

  private generateTimeNumber = (time: TMeridiemBasis, at: TTimeBasis): number => {
    if (time === 'AM') {
      switch (at) {
        case '12':
          return 0;
        default:
          return Number(at);
      }
    } else {
      switch (at) {
        case '12':
          return Number(at);
        default:
          return Number(at) + 12;
      }
    }
  };

  private generateSchedulesWithExpression = (schedules: TNadSchedule[]):TSchedulesWithExpression[]=>{
    const schedulesArray = schedules.reduce((acc: any, curr) => {
      const { config, name,disable=false,logging=true,callback} = curr ?? {};
      const expression = this.generateExpression(curr)
      const { basis,event} = config
      if (!disable) {
        const {frequent,at,time} = config as DailySchedule|MonthlySchedule|YearlySchedule
        return [
          ...acc,
          {
            name,
            basis,
            event,
            frequent:frequent?frequent:'',
            at:at?at:'',
            time:time?time:'',
            disable,
            logging,
            expression,
            callback
          }
        ]
      }
      return acc;
    }, []);
    return schedulesArray
  }

  private isLastDayOfMonth = (date): boolean => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.getDate() === 1;
  };

  private isLastDayOfYear = (date): boolean => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.getMonth() === 0 && nextDay.getDate() === 1;
  };

  private logRegisteredSchedules = (schedules: TSchedulesWithExpression[]) => {
    logger.info(`Registered Schedules :`);
    if(schedules.length){
      logger.table(schedules,[...Object.keys(schedules[0])]);
    }else{
      logger.table([],[])
    }
  };

  run() {
    this.schedules.map(item => {
      const { name,disable,logging,expression ,callback,event} = item ?? {};
      if (!disable) {
        if(validate(expression)){
          // check if sched for every last day of month
          if((event as TMonthlyBasis) === 'every_last_day_of_month' ){
            ScheduleNodeCron(expression, date => {
              if(this.isLastDayOfMonth(new Date(date))){
                if (callback) {
                  callback();
                  if (logging) {
                    logger.info(`✅ Schedule named: [${name}] executed successfully`);
                  }
                }
              }
            });
          // check if sched for every last day of year
          }else if((event as TYearlyBasis) === 'every_last_day_of_year'){
            ScheduleNodeCron(expression, date => {
              if(this.isLastDayOfYear(new Date(date))){
                if (callback) {
                  callback();
                  if (logging) {
                    logger.info(`✅ Schedule named: [${name}] executed successfully`);
                  }
                }
              }
            });
          }else{
            ScheduleNodeCron(expression, date => {
              if (callback) {
                callback();
                if (logging) {
                  logger.info(`✅ Schedule named: [${name}] executed successfully`);
                }
              }
            });
          }
        }
      }
    });
  }
}
