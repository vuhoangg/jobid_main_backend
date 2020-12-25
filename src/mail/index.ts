import axios from "axios";
import {activityLog, errorLog} from "../helpers/log";

// campaign
const SYSTEM_CAMPAIGN = 1;

// template user
const WELCOME_USER_TEMPLATE = 10;
const APPROVE_CV = 2;
const DECLINE_CV = 3;

// template employer
const WELCOME_EMPLOYER_TEMPLATE = 11;
const NEW_USER_APPLY = 1;
const NEW_JOB_POST = 4;



export const sendWelcome = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: WELCOME_USER_TEMPLATE,
        data: data
    }).then(r => activityLog(`Gửi email (${email}) chào người dùng mới thành công!`))
        .catch(e => errorLog(e))
};
export const sendUserApproveCv = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: APPROVE_CV,
        data: data
    }).then(r => activityLog(`Gửi email (${email}) nhà tuyển dụng đã duyệt hồ sơ của ứng viên thành công!`))
        .catch(e => errorLog(e))
}

export const sendUserDeclineCv = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: DECLINE_CV,
        data: data
    }).then(r => activityLog(`Gửi email (${email}) nhà tuyển dụng đã từ chối hồ sơ của ứng viên thành công!`))
        .catch(e => errorLog(e))
}



export const sendWelcomeEmployer = (email: string, name: string, data: string) => {
  axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
    apiKey: process.env.MAIL_API_KEY,
    email: email,
    name: name,
    campaign_id: SYSTEM_CAMPAIGN,
    template_id: WELCOME_EMPLOYER_TEMPLATE,
    data: data
  }).then(r => activityLog(`Gửi email (${email}) chào nhà tuyển dụng mới thành công!`))
    .catch(e => errorLog(e))
}

export const sendEmployerNewJobPost = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_JOB_POST,
        data: data
    }).then(r => activityLog(`Gửi email (${email}) nhà tuyển dụng đã đăng tin mới thành công!`))
        .catch(e => errorLog(e))
}

export const sendEmployerUserApply = (email: string, name: string, data: string) => {
    axios.post(`${process.env.MAIL_API_URL}/api/email-queue`, {
        apiKey: process.env.MAIL_API_KEY,
        email: email,
        name: name,
        campaign_id: SYSTEM_CAMPAIGN,
        template_id: NEW_USER_APPLY,
        data: data
    }).then(r => activityLog(`Gửi email (${email}) nhà tuyển dụng có ứng viên ứng tuyển mới thành công!`))
        .catch(e => errorLog(e))
}
