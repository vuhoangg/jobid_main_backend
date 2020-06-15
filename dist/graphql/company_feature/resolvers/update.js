"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyFeature = exports.createCompanyFeature = void 0;
const CompanyFeatureRepository_1 = __importDefault(require("../../../db/repositories/CompanyFeatureRepository"));
const permission_1 = require("../../../helpers/permission");
function createCompanyFeature(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CompanyFeatureRepository_1.default.create(args.input);
        }
    }
}
exports.createCompanyFeature = createCompanyFeature;
function updateCompanyFeature(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CompanyFeatureRepository_1.default.update(args.input);
        }
    }
}
exports.updateCompanyFeature = updateCompanyFeature;
//# sourceMappingURL=update.js.map