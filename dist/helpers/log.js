"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.errorLog = (error) => {
    process.env.APP_DEBUG === "true" ? console.log(`error: ${error.name} ${error.message}`) : null;
    if (process.env.APP_ENV == "production") {
        if (process.env.APP_LOG === "mattermost") {
            let payload = {
                "text": `${error.name} - ${error.message} - ${error.stack}`,
                "username": "Bug Bot"
            };
            axios_1.default.post(process.env.LOG_WEBHOOK, payload).then(r => {
            }).catch(e => {
                console.log(`${error.name} - ${error.message} - ${error.stack}`);
            });
        }
    }
};
exports.activityLog = (message) => {
    if (process.env.APP_ENV == "production") {
        if (process.env.APP_LOG === "mattermost") {
            let payload = {
                "text": message,
                "username": "Kết Nối Việc"
            };
            axios_1.default.post(process.env.ACTIVITY_WEBHOOK, payload).then(r => {
            }).catch(e => {
                console.log(e.toString());
            });
        }
    }
};
//# sourceMappingURL=log.js.map