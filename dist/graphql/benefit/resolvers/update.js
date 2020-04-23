"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BenefitRepository_1 = __importDefault(require("../../../db/repositories/BenefitRepository"));
const permission_1 = require("../../../helpers/permission");
function updateBenefit(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return BenefitRepository_1.default.update(args.input);
        }
    }
}
exports.updateBenefit = updateBenefit;
function createBenefit(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return BenefitRepository_1.default.create(args.input);
        }
    }
}
exports.createBenefit = createBenefit;
//# sourceMappingURL=update.js.map