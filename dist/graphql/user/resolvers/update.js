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
exports.removeSpam = exports.markSpam = exports.updateUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateUser = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (input && input.customize_info && input.customize_info.first_name && input.customize_info.last_name) {
            input.customize_info.full_name = `${input.customize_info.first_name.trim()} ${input.customize_info.last_name.trim()}`;
        }
        input = Object.assign(input, { _id: loggedUser._id });
        return UserRepository_1.default.update(input);
    }
});
exports.markSpam = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return UserRepository_1.default.markSpam(input._id);
        }
    }
});
exports.removeSpam = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return UserRepository_1.default.removeSpam(input._id);
        }
    }
});
//# sourceMappingURL=update.js.map