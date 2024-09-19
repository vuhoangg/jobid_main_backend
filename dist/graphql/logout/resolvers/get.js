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
exports.logout = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const logout = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = context.res.locals.fullUser;
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        context.logout();
    }
    yield UserRepository_1.default.update({ _id: user._id, accessToken: "", refreshToken: "" });
    let ret = {
        status: true,
    };
    return ret;
});
exports.logout = logout;
//# sourceMappingURL=get.js.map