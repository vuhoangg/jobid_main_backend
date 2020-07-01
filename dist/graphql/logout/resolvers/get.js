"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
exports.logout = (args, context) => {
    context.res.cookie("user", null, { expires: new Date(), domain: process.env.COOKIE_DOMAIN, httpOnly: false });
    if (context.isAuthenticated()) {
        context.logout();
    }
    let ret = {
        status: true,
    };
    return ret;
};
//# sourceMappingURL=get.js.map