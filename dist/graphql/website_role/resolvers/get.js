"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsiteRole = void 0;
const permission_1 = require("../../../helpers/permission");
function getWebsiteRole(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedInUser = context.user;
        let email = loggedInUser.email;
        if (permission_1.isSuperUser(email)) {
            return {
                role: "super_admin"
            };
        }
    }
    return {
        role: "member"
    };
}
exports.getWebsiteRole = getWebsiteRole;
//# sourceMappingURL=get.js.map