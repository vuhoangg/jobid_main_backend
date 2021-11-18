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
exports.deleteCompanyNotificationRegister = exports.createCompanyNotificationRegister = void 0;
const CompanyNotificationRegisterRepository_1 = __importDefault(require("../../../db/repositories/CompanyNotificationRegisterRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.createCompanyNotificationRegister = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        let r1 = yield CompanyNotificationRegisterRepository_1.default.getBy(input, {});
        if (!r1) {
            let r2 = yield CompanyNotificationRegisterRepository_1.default.create(input);
            return r2;
        }
    }
});
exports.deleteCompanyNotificationRegister = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        let r1 = yield CompanyNotificationRegisterRepository_1.default.getBy(input, {});
        if (r1) {
            yield CompanyNotificationRegisterRepository_1.default.delete(r1._id);
            return r1;
        }
    }
});
//# sourceMappingURL=update.js.map