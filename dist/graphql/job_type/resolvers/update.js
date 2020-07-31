"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobType = exports.updateJobType = void 0;
const JobTypeRepository_1 = __importDefault(require("../../../db/repositories/JobTypeRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobType(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobTypeRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobType = updateJobType;
function createJobType(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobTypeRepository_1.default.create(args.input);
        }
    }
}
exports.createJobType = createJobType;
//# sourceMappingURL=update.js.map