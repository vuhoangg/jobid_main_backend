import {api} from "../utils/api";
import {debugLog} from "../helpers/log";

export const sendWelcome = (email: string) => {
    api("POST", "https://mail-api.nhadatmoi.net/send", {send_to: email})
        .then(r => debugLog(`send email success ${email}`))
        .catch(e => debugLog(`send email fail ${email}`))
};

