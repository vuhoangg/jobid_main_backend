"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermission = exports.createCompany = exports.updateCompany = void 0;
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const permission_1 = require("../../../helpers/permission");
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
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
function assignPermission(source, args, context, info) {
    const dataUpdateUser = args.input.listUser.map((item) => ({
        _id: item,
        company_role: { company_id: args.input.company, group_permission: args.input.permission },
    }));
    const dataUpdateCompany = args.input.listUser.map((item) => ({
        _id: args.input.company,
        users: { user_id: item, permission: args.input.permission },
    }));
    Promise.all(dataUpdateUser.map((data) => UserRepository_1.default.updateCompanyPermission(data)));
    Promise.all(dataUpdateCompany.map((data) => CompanyRepository_1.default.updateUserPermission(data)));
    if (context.isAuthenticated()) {
        return { status: 200 };
    }
}
exports.assignPermission = assignPermission;
//# sourceMappingURL=update.js.map