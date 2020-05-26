"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobTitle = exports.updateJobTitle = void 0;
const JobTitleRepository_1 = __importDefault(require("../../../db/repositories/JobTitleRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobTitle(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobTitleRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobTitle = updateJobTitle;
function createJobTitle(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobTitleRepository_1.default.create(args.input);
        }
    }
}
exports.createJobTitle = createJobTitle;
//# sourceMappingURL=update.js.map