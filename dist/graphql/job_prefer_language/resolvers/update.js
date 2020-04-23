"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPreferLanguageRepository_1 = __importDefault(require("../../../db/repositories/JobPreferLanguageRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobPreferLanguage(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobPreferLanguageRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobPreferLanguage = updateJobPreferLanguage;
function createJobPreferLanguage(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobPreferLanguageRepository_1.default.create(args.input);
        }
    }
}
exports.createJobPreferLanguage = createJobPreferLanguage;
//# sourceMappingURL=update.js.map