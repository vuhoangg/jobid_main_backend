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
exports.createBenefit = exports.updateBenefit = void 0;
const BenefitRepository_1 = __importDefault(require("../../../db/repositories/BenefitRepository"));
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
const updateBenefit = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if ((0, permission_1.isSuperUser)(loggedUser.email)) {
            return BenefitRepository_1.default.update(args.input);
        }
    }
});
exports.updateBenefit = updateBenefit;
const createBenefit = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if ((0, permission_1.isSuperUser)(loggedUser.email)) {
            return BenefitRepository_1.default.create(args.input);
        }
    }
});
exports.createBenefit = createBenefit;
//# sourceMappingURL=update.js.map