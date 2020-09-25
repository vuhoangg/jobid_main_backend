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
exports.createJobPreferLanguage = exports.updateJobPreferLanguage = void 0;
const JobPreferLanguageRepository_1 = __importDefault(require("../../../db/repositories/JobPreferLanguageRepository"));
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateJobPreferLanguage = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobPreferLanguageRepository_1.default.update(args.input);
        }
    }
});
exports.createJobPreferLanguage = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobPreferLanguageRepository_1.default.create(args.input);
        }
    }
});
//# sourceMappingURL=update.js.map