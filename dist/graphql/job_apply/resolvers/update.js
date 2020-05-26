"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobApply = void 0;
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
function updateJobApply(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return JobApplyRepository_1.default.applyJob(input);
    }
}
exports.updateJobApply = updateJobApply;
//# sourceMappingURL=update.js.map