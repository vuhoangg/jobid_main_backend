"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
function updateUser(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (loggedUser._id.toString() === args.input._id) {
            return UserRepository_1.default.update(args.input);
        }
    }
}
exports.updateUser = updateUser;
//# sourceMappingURL=update.js.map