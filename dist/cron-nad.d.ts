import { TNadSchedule } from './types';
declare class NadScheduler {
    private schedules;
    constructor(options: TNadSchedule[]);
    private generateExpression;
    private generateTimeNumber;
    private generateSchedulesWithExpression;
    private isLastDayOfMonth;
    private isLastDayOfYear;
    private logRegisteredSchedules;
    run(): void;
}
export { NadScheduler };
//# sourceMappingURL=cron-nad.d.ts.map