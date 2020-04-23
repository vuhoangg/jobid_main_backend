"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../utils/api");
const log_1 = require("../helpers/log");
exports.sendWelcome = (email) => {
    api_1.api("POST", "https://mail-api.nhadatmoi.net/send", { send_to: email })
        .then(r => log_1.debugLog(`send email success ${email}`))
        .catch(e => log_1.debugLog(`send email fail ${email}`));
};
//# sourceMappingURL=index.js.map