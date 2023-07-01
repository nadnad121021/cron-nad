"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NadScheduler = void 0;
const node_cron_1 = require("node-cron");
const logger_1 = require("./utils/logger");
const constants_1 = require("./constants");
class NadScheduler {
    constructor(options) {
        this.schedules = [];
        this.generateExpression = (schedule) => {
            var _a, _b;
            const { config } = schedule;
            const { basis, event } = config;
            let expression = (_a = constants_1.expressions[event]) !== null && _a !== void 0 ? _a : '* * * * *';
            switch (basis) {
                case 'MINUTES':
                case 'HOURLY':
                    return expression;
                default:
                    const { time, at, frequent } = config;
                    if (time && at) {
                        const generatedTimeNumber = this.generateTimeNumber(time, at);
                        const parts = expression.split(' ');
                        parts[1] = generatedTimeNumber.toString();
                        return parts.join(' ');
                    }
                    if (frequent) {
                        const currentParts = expression.split(' ');
                        const frequentParts = ((_b = constants_1.expressions[frequent]) !== null && _b !== void 0 ? _b : expression).split(' ');
                        currentParts[0] = frequentParts[0];
                        currentParts[1] = frequentParts[1];
                        return currentParts.join(' ');
                    }
                    return expression;
            }
        };
        this.generateTimeNumber = (time, at) => {
            if (time === 'AM') {
                switch (at) {
                    case '12':
                        return 0;
                    default:
                        return Number(at);
                }
            }
            else {
                switch (at) {
                    case '12':
                        return Number(at);
                    default:
                        return Number(at) + 12;
                }
            }
        };
        this.generateSchedulesWithExpression = (schedules) => {
            const schedulesArray = schedules.reduce((acc, curr) => {
                const { config, name, disable = false, logging = true, callback } = curr !== null && curr !== void 0 ? curr : {};
                const expression = this.generateExpression(curr);
                const { basis, event } = config;
                if (!disable) {
                    const { frequent, at, time } = config;
                    return [
                        ...acc,
                        {
                            name,
                            basis,
                            event,
                            frequent: frequent ? frequent : '',
                            at: at ? at : '',
                            time: time ? time : '',
                            disable,
                            logging,
                            expression,
                            callback
                        }
                    ];
                }
                return acc;
            }, []);
            return schedulesArray;
        };
        this.isLastDayOfMonth = (date) => {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay.getDate() === 1;
        };
        this.isLastDayOfYear = (date) => {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay.getMonth() === 0 && nextDay.getDate() === 1;
        };
        this.logRegisteredSchedules = (schedules) => {
            logger_1.logger.info(`Registered Schedules :`);
            if (schedules.length) {
                logger_1.logger.table(schedules, [...Object.keys(schedules[0])]);
            }
            else {
                logger_1.logger.table([], []);
            }
        };
        this.schedules = this.generateSchedulesWithExpression(options);
        this.logRegisteredSchedules(this.schedules);
    }
    run() {
        this.schedules.map(item => {
            const { name, disable, logging, expression, callback, event } = item !== null && item !== void 0 ? item : {};
            if (!disable) {
                if ((0, node_cron_1.validate)(expression)) {
                    // check if sched for every last day of month
                    if (event === 'every_last_day_of_month') {
                        (0, node_cron_1.schedule)(expression, date => {
                            if (this.isLastDayOfMonth(new Date(date))) {
                                if (callback) {
                                    callback();
                                    if (logging) {
                                        logger_1.logger.info(`✅ Schedule named: [${name}] executed successfully`);
                                    }
                                }
                            }
                        });
                        // check if sched for every last day of year
                    }
                    else if (event === 'every_last_day_of_year') {
                        (0, node_cron_1.schedule)(expression, date => {
                            if (this.isLastDayOfYear(new Date(date))) {
                                if (callback) {
                                    callback();
                                    if (logging) {
                                        logger_1.logger.info(`✅ Schedule named: [${name}] executed successfully`);
                                    }
                                }
                            }
                        });
                    }
                    else {
                        (0, node_cron_1.schedule)(expression, date => {
                            if (callback) {
                                callback();
                                if (logging) {
                                    logger_1.logger.info(`✅ Schedule named: [${name}] executed successfully`);
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}
exports.NadScheduler = NadScheduler;
//# sourceMappingURL=cron-nad.js.map