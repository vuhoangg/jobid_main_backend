"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobAlert = void 0;
const JobAlertRepository_1 = __importDefault(require("../../../db/repositories/JobAlertRepository"));
function updateJobAlert(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return JobAlertRepository_1.default.update(input);
    }
}
exports.updateJobAlert = updateJobAlert;
//# sourceMappingURL=update.js.map