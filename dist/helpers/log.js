"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLog = exports.errorLog = void 0;
exports.errorLog = (error) => {
    process.env.APP_DEBUG === "true" ? console.log(`error: ${error.name} ${error.message}`) : null;
};
exports.debugLog = (message) => {
    process.env.APP_DEBUG === "true" ? console.log(`debug: ${message}`) : null;
};
//# sourceMappingURL=log.js.map