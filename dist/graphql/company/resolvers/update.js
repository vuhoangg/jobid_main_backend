"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = exports.updateCompany = void 0;
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const permission_1 = require("../../../helpers/permission");
function updateCompany(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CompanyRepository_1.default.update(args.input);
        }
    }
}
exports.updateCompany = updateCompany;
function createCompany(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            // TODO remove input premium, verify status
            return CompanyRepository_1.default.create(args.input);
        }
    }
}
exports.createCompany = createCompany;
//# sourceMappingURL=update.js.map