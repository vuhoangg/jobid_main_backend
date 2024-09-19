"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseNull = void 0;
const promiseNull = () => {
    return new Promise(resolve => {
        resolve(null);
    });
};
exports.promiseNull = promiseNull;
//# sourceMappingURL=promise.js.map