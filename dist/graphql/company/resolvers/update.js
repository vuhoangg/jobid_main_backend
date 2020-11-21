"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingBySlug = exports.premiumCompany = exports.verifyCompany = exports.assignPermission = exports.createCompany = exports.updateCompany = void 0;
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const CompanyViewRepository_1 = __importDefault(require("../../../db/repositories/CompanyViewRepository"));
const permission_1 = require("../../../helpers/permission");
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const string_1 = require("../../../helpers/string");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateCompany = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = authenticate_1.authenticateEmployer(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        if (permission_1.isSuperUser(loggedEmployer.email)) {
            return CompanyRepository_1.default.update(args.input);
        }
        else {
            let _id = args.input._id;
            let r1 = yield CompanyRepository_1.default.get(_id, {});
            if (r1 && r1.created_by.toString() == loggedEmployer._id.toString()) {
                return CompanyRepository_1.default.update(args.input);
            }
            else {
                return r1;
            }
        }
    }
});
exports.createCompany = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    input.slug = string_1.toSlug(input.name, true).toLowerCase();
    let isAuthenticated = yield authenticate_1.authenticateEmployer(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        input = Object.assign(input, { created_by: loggedEmployer._id });
        return CompanyRepository_1.default.create(input);
    }
});
exports.assignPermission = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        return { status: 200 };
    }
});
exports.verifyCompany = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CompanyRepository_1.default.verify(input._id);
        }
    }
});
exports.premiumCompany = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CompanyRepository_1.default.premium(input._id);
        }
    }
});
exports.trackingBySlug = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    let company = yield CompanyRepository_1.default.increaseViewCountBySlug(input.slug);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let payload = {
            company: company._id,
            user: loggedUser._id,
        };
        yield CompanyViewRepository_1.default.create(payload);
    }
    return {
        status: true
    };
});
//# sourceMappingURL=update.js.map