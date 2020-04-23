"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = (error) => {
    process.env.APP_DEBUG === "true" ? console.log(`error: ${error.name} ${error.message}`) : null;
};
exports.debugLog = (message) => {
    process.env.APP_DEBUG === "false" ? console.log(`debug: ${message}`) : null;
};
//# sourceMappingURL=log.js.map