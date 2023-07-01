
export type TScheduleBasis = 'MINUTES'|'HOURLY'|'WEEKLY'|'YEARLY'

export type TMinutesBasis = 
'every_minute'
| 'every_five_minutes'
| 'every_ten_minutes'
| 'every_fiften_minutes'
| 'every_twenty_minutes'
| 'every_twenty_five_minutes'
| 'every_thirty_minutes'
| 'every_thirty_five_minutes'
| 'every_forty_minutes'
| 'every_forty_five_minutes'
| 'every_fifty_minutes'
| 'every_fifty_five_minutes'

export type THourlyBasis =
  'every_hour'
  | 'every_hour_and_thirty_mins'
  | 'every_two_hours'
  | 'every_two_hours_and_thirty_mins'
  | 'every_three_hours'
  | 'every_three_hours_and_thirty_mins'
  | 'every_four_hours'
  | 'every_four_hours_and_thirty_mins'
  | 'every_five_hours'
  | 'every_five_hours_and_thirty_mins'
  | 'every_six_hours'
  | 'every_six_hours_and_thirty_mins'
  | 'every_seven_hours'
  | 'every_seven_hours_and_thirty_mins'
  | 'every_eight_hours'
  | 'every_eight_hours_and_thirty_mins'
  | 'every_nine_hours'
  | 'every_nine_hours_and_thirty_mins'
  | 'every_ten_hours'
  | 'every_ten_hours_and_thirty_mins'
  | 'every_eleven_hours'
  | 'every_eleven_hours_and_thirty_mins'

export type TDailyBasis = 'every_monday'| 'every_tuesday'| 'every_wednesday'| 'every_thursday'| 'every_friday'| 'every_saturday'| 'every_sunday'

export type TMonthlyBasis = 'every_first_day_of_month'| 'every_last_day_of_month'
export type TYearlyBasis =  'every_first_day_of_year'| 'every_last_day_of_year'

export type TTimeBasis = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'

export type TMeridiemBasis = 'AM' | 'PM'

export type TTaskSchedule=
| { basis: 'MINUTES'; event: TMinutesBasis }
| { basis: 'HOURLY'; event: THourlyBasis }
| DailySchedule
| MonthlySchedule
| YearlySchedule

export type TAll = TMinutesBasis  | THourlyBasis | TDailyBasis  | TMonthlyBasis | TYearlyBasis

export type TNadSchedule = {
  name:string,
  config:TTaskSchedule,
  callback:()=>void
  disable?:boolean
  logging?:boolean
}

type DailyWithFrenquent = {
  basis: 'DAILY'; 
  event: TDailyBasis; 
  frequent:TMinutesBasis |THourlyBasis
  at?: never; 
  time?: never
};

type DailyWithTime = {
  basis: 'DAILY'; 
  event: TDailyBasis; 
  at: TTimeBasis; 
  time: TMeridiemBasis
  frequent?:never
}; 

type MonthlyWithFrenquent = {
  basis: 'MONTHLY'; 
  event: TMonthlyBasis; 
  frequent:TMinutesBasis |THourlyBasis
  at?: never; 
  time?: never
};
  
type MonthyWithTime = {
  basis: 'MONTHLY'; 
  event: TMonthlyBasis; 
  at: TTimeBasis; 
  time: TMeridiemBasis
  frequent?:never
}; 

type YearlyWithFrenquent = {
  basis: 'YEARLY'; 
  event: TYearlyBasis; 
  frequent:TMinutesBasis |THourlyBasis
  at?: never; 
  time?: never
};
  
type YearlyWithTime = {
  basis: 'YEARLY'; 
  event: TYearlyBasis; 
  at: TTimeBasis; 
  time: TMeridiemBasis
  frequent?:never
}; 
  
export type DailySchedule = NonNullable<DailyWithFrenquent | DailyWithTime>;
export type MonthlySchedule = NonNullable<MonthlyWithFrenquent | MonthyWithTime>;
export type YearlySchedule  = NonNullable<YearlyWithFrenquent | YearlyWithTime>;

