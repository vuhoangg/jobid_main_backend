"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSpam = exports.markSpam = exports.updateUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const permission_1 = require("../../../helpers/permission");
function updateUser(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        if (input && input.customize_info && input.customize_info.first_name && input.customize_info.last_name) {
            input.customize_info.full_name = `${input.customize_info.first_name.trim()} ${input.customize_info.last_name.trim()}`;
        }
        input = Object.assign(input, { _id: loggedUser._id });
        return UserRepository_1.default.update(input);
    }
}
exports.updateUser = updateUser;
function markSpam(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return UserRepository_1.default.markSpam(input._id);
        }
    }
}
exports.markSpam = markSpam;
function removeSpam(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return UserRepository_1.default.removeSpam(input._id);
        }
    }
}
exports.removeSpam = removeSpam;
//# sourceMappingURL=update.js.map