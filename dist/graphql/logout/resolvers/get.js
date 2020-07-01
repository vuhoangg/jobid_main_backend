"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
exports.logout = (args, context) => {
    let expired = new Date();
    expired.setDate(expired.getDate() - 30);
    context.res.cookie("user", null, { expires: expired, domain: process.env.COOKIE_DOMAIN, httpOnly: false });
    if (context.isAuthenticated()) {
        context.logout();
    }
    let ret = {
        status: true,
    };
    return ret;
};
//# sourceMappingURL=get.js.map