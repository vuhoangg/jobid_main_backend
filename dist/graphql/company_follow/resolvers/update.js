"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyFollow = void 0;
const CompanyFollowRepository_1 = __importDefault(require("../../../db/repositories/CompanyFollowRepository"));
function updateCompanyFollow(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return CompanyFollowRepository_1.default.update(input);
    }
}
exports.updateCompanyFollow = updateCompanyFollow;
//# sourceMappingURL=update.js.map