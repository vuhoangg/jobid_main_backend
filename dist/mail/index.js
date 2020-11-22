"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmployerUserApply = exports.sendEmployerNewJobPost = exports.sendWelcomeEmployer = exports.sendUserDeclineCv = exports.sendUserApproveCv = exports.sendWelcome = void 0;
const axios_1 = __importDefault(require("axios"));
const log_1 = require("../helpers/log");
// campaign
const SYSTEM_CAMPAIGN = 1;
// template user
const WELCOME_USER_TEMPLATE = 1;
const APPROVE_CV = 2;
const DECLINE_CV = 3;
// template employer
const WELCOME_EMPLOYER_TEMPLATE = 1;
const NEW_USER_APPLY = 1;
const NEW_JOB_POST = 4;
exports.sendWelcome = (email, name, data) => {
    axios_1.default.post(`${process.env.MAIL_API_URL}`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: WELCOME_USER_TEMPLATE,
        data: data
    }).then(r => log_1.debugLog(`send welcome email success ${email}`))
        .catch(e => log_1.debugLog(`send welcome email fail ${email}`));
};
exports.sendUserApproveCv = (email, name, data) => {
    axios_1.default.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: APPROVE_CV,
        data: data
    }).then(r => log_1.debugLog(`send email success ${email}`))
        .catch(e => log_1.debugLog(`send email fail ${email} - ${e.message}`));
};
exports.sendUserDeclineCv = (email, name, data) => {
    axios_1.default.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: DECLINE_CV,
        data: data
    }).then(r => log_1.debugLog(`send email success ${email}`))
        .catch(e => log_1.debugLog(`send email fail ${email} - ${e.message}`));
};
exports.sendWelcomeEmployer = (email, name, data) => {
};
exports.sendEmployerNewJobPost = (email, name, data) => {
    axios_1.default.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_JOB_POST,
        data: data
    }).then(r => log_1.debugLog(`send email success ${email}`))
        .catch(e => log_1.debugLog(`send email fail ${email} - ${e.message}`));
};
exports.sendEmployerUserApply = (email, name, data) => {
    axios_1.default.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_USER_APPLY,
        data: data
    }).then(r => log_1.debugLog(`send email success ${email}`))
        .catch(e => log_1.debugLog(`send email fail ${email} - ${e.message}`));
};
//# sourceMappingURL=index.js.map