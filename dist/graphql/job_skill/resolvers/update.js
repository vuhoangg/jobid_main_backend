"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobSkillRepository_1 = __importDefault(require("../../../db/repositories/JobSkillRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobSkill(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobSkillRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobSkill = updateJobSkill;
function createJobSkill(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobSkillRepository_1.default.create(args.input);
        }
    }
}
exports.createJobSkill = createJobSkill;
//# sourceMappingURL=update.js.map