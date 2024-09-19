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
exports.updateWard = void 0;
const permission_1 = require("../../../helpers/permission");
const WardRepository_1 = __importDefault(require("../../../db/repositories/WardRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const updateWard = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO Admin and User has permission
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if ((0, permission_1.isSuperUser)(loggedUser.email)) {
            return WardRepository_1.default.update(input);
        }
    }
    else {
        return null;
    }
});
exports.updateWard = updateWard;
//# sourceMappingURL=update.js.map