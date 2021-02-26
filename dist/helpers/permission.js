"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperUser = (email) => {
    return true;
    let superUsers = process.env.APP_SUPER_USER;
    let arrSuper = superUsers.split(",");
    for (let i = 0; i < arrSuper.length; i++) {
        if (arrSuper[i] === email) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=permission.js.map