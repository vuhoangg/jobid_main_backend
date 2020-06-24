"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCurriculumVitae = exports.updateCurriculumVitae = void 0;
const CurriculumVitaeRepository_1 = __importDefault(require("../../../db/repositories/CurriculumVitaeRepository"));
function updateCurriculumVitae(source, args, context, info) {
    if (context.isAuthenticated()) {
        return CurriculumVitaeRepository_1.default.update(args.input);
    }
}
exports.updateCurriculumVitae = updateCurriculumVitae;
function createCurriculumVitae(source, args, context, info) {
    // console.log(args);
    // if (context.isAuthenticated()) {
    return CurriculumVitaeRepository_1.default.create(args.input);
    // }
}
exports.createCurriculumVitae = createCurriculumVitae;
//# sourceMappingURL=update.js.map