"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron_nad_1 = require("../cron-nad");
// EX. for minutes basis
const scheduleMinutes = {
    basis: 'MINUTES',
    event: 'every_minute'
};
// EX. for hourly basis
const scheduleHourly = {
    basis: 'HOURLY',
    event: 'every_hour'
};
// EX. for daily basis - use frequent
const scheduleDaily1 = {
    basis: 'DAILY',
    event: 'every_monday',
    frequent: 'every_five_minutes'
};
// EX. for daily basis - use specific time
const scheduleDaily2 = {
    basis: 'DAILY',
    event: 'every_sunday',
    at: '12',
    time: 'AM'
};
// EX. for monthly basis - use frequent
const scheduleMonthly1 = {
    basis: 'MONTHLY',
    event: 'every_first_day_of_month',
    frequent: 'every_six_hours'
};
// EX. for monthly basis - use specific time
const scheduleMonthly2 = {
    basis: 'MONTHLY',
    event: 'every_last_day_of_month',
    at: '12',
    time: 'AM'
};
// EX. for Yearly basis - use frequent
const scheduleYearly1 = {
    basis: 'YEARLY',
    event: 'every_first_day_of_year',
    frequent: 'every_six_hours'
};
// EX. for daily basis - use specific time
const scheduleYearly2 = {
    basis: 'YEARLY',
    event: 'every_last_day_of_year',
    frequent: 'every_five_hours'
};
const scheduler = new cron_nad_1.NadScheduler([
    {
        name: 'Minutes',
        config: scheduleMinutes,
        callback: () => console.log('scheduleMinutes'),
    },
    {
        name: 'Hour',
        config: scheduleHourly,
        callback: () => console.log('scheduleHourly'),
    },
    {
        name: 'Daily 1',
        config: scheduleDaily1,
        callback: () => console.log('scheduleDaily1'),
    },
    {
        name: 'Daily 2',
        config: scheduleDaily2,
        callback: () => console.log('scheduleDaily2'),
    },
    {
        name: 'Monthly 1',
        config: scheduleMonthly1,
        callback: () => console.log('scheduleMonthly1'),
    },
    {
        name: 'Monthly 2',
        config: scheduleMonthly2,
        callback: () => console.log('scheduleMonthly2'),
    },
    {
        name: 'Yearly 1',
        config: scheduleYearly1,
        callback: () => console.log('scheduleYearly1'),
    },
    {
        name: 'Yearly 2',
        config: scheduleYearly2,
        callback: () => console.log('scheduleYearly2'),
    },
]);
scheduler.run();
//# sourceMappingURL=test.js.map