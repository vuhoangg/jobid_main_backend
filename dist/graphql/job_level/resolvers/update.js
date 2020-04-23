"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobLevelRepository_1 = __importDefault(require("../../../db/repositories/JobLevelRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobLevel(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobLevelRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobLevel = updateJobLevel;
function createJobLevel(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobLevelRepository_1.default.create(args.input);
        }
    }
}
exports.createJobLevel = createJobLevel;
//# sourceMappingURL=update.js.map