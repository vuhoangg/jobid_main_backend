import axios, {Method} from "axios";

const client = axios.create({
    timeout: 30000,
});

export const api = (method: Method, url: string, data?: any) => client
    .request({
        data: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method,
        url,
        withCredentials: true,
    })
    .then((response: any) => response.data);
