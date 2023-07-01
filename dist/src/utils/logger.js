"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = {
    info: (str) => {
        console.info(`${dateFormatter(new Date())} :[cron-nad] Info: ${str}`);
    },
    table: (data, columns) => {
        console.table(data, columns);
    }
};
exports.logger = logger;
const dateFormatter = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
//# sourceMappingURL=logger.js.map