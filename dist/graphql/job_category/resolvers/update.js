"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobCategory = exports.updateJobCategory = void 0;
const JobCategoryRepository_1 = __importDefault(require("../../../db/repositories/JobCategoryRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobCategory(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobCategoryRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobCategory = updateJobCategory;
function createJobCategory(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobCategoryRepository_1.default.create(args.input);
        }
    }
}
exports.createJobCategory = createJobCategory;
//# sourceMappingURL=update.js.map