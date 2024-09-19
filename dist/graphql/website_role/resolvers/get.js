"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsiteRole = void 0;
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
const getWebsiteRole = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let loggedInUser = context.res.locals.fullUser;
        let email = loggedInUser.email;
        if ((0, permission_1.isSuperUser)(email)) {
            return {
                role: "super_admin",
            };
        }
    }
    return {
        role: "member",
    };
});
exports.getWebsiteRole = getWebsiteRole;
//# sourceMappingURL=get.js.map