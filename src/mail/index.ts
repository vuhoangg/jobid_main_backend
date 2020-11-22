import axios from "axios";
import { debugLog } from "../helpers/log";

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



export const sendWelcome = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: WELCOME_USER_TEMPLATE,
        data: data
    }).then(r => debugLog(`send welcome email success ${email}`))
        .catch(e => debugLog(`send welcome email fail ${email}`))
};
export const sendUserApproveCv = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: APPROVE_CV,
        data: data
    }).then(r => debugLog(`send email success ${email}`))
        .catch(e => debugLog(`send email fail ${email} - ${e.message}`))
}

export const sendUserDeclineCv = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: DECLINE_CV,
        data: data
    }).then(r => debugLog(`send email success ${email}`))
        .catch(e => debugLog(`send email fail ${email} - ${e.message}`))
}



export const sendWelcomeEmployer = (email: string, name: string, data: string) => {

}

export const sendEmployerNewJobPost = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_JOB_POST,
        data: data
    }).then(r => debugLog(`send email success ${email}`))
        .catch(e => debugLog(`send email fail ${email} - ${e.message}`))
}

export const sendEmployerUserApply = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_USER_APPLY,
        data: data
    }).then(r => debugLog(`send email success ${email}`))
        .catch(e => debugLog(`send email fail ${email} - ${e.message}`))
}
