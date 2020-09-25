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
exports.updateCity = void 0;
const permission_1 = require("../../../helpers/permission");
const CityRepository_1 = __importDefault(require("../../../db/repositories/CityRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateCity = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO Admin and User has permission
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CityRepository_1.default.update(input);
        }
    }
    else {
        return null;
    }
});
//# sourceMappingURL=update.js.map