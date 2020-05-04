"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileViewRepository_1 = __importDefault(require("../../../db/repositories/ProfileViewRepository"));
function updateProfileView(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return ProfileViewRepository_1.default.update(input);
    }
}
exports.updateProfileView = updateProfileView;
//# sourceMappingURL=update.js.map