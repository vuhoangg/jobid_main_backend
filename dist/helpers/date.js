"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberToString = (n) => {
    return n < 10 ? `0${n}` : `${n}`;
};
exports.yyyy_mm_dd_hh_mi = (date) => {
    const hour = date.getHours();
    const min = date.getMinutes();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${numberToString(month)}-${numberToString(day)}-${numberToString(hour)}-${numberToString(min)}`;
};
exports.yyyy_mm_dd_hh_mi_ss = (date) => {
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${numberToString(month)}-${numberToString(day)}-${numberToString(hour)}-${numberToString(min)}-${numberToString(sec)}`;
};
//# sourceMappingURL=date.js.map