"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
const client = axios_1.default.create({
    timeout: 30000,
});
exports.api = (method, url, data) => client
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
    .then((response) => response.data);
//# sourceMappingURL=api.js.map