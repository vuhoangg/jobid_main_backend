"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
function updateUser(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { _id: loggedUser._id });
        return UserRepository_1.default.update(input);
    }
}
exports.updateUser = updateUser;
//# sourceMappingURL=update.js.map