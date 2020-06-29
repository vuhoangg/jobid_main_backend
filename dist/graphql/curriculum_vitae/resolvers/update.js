"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurriculumVitae = exports.createCurriculumVitae = void 0;
const CurriculumVitaeRepository_1 = __importDefault(require("../../../db/repositories/CurriculumVitaeRepository"));
function createCurriculumVitae(source, args, context, info) {
    if (context.isAuthenticated()) {
        return CurriculumVitaeRepository_1.default.create(args.input);
    }
}
exports.createCurriculumVitae = createCurriculumVitae;
function updateCurriculumVitae(source, args, context, info) {
    if (context.isAuthenticated()) {
        return CurriculumVitaeRepository_1.default.update(args.input);
    }
}
exports.updateCurriculumVitae = updateCurriculumVitae;
//# sourceMappingURL=update.js.map