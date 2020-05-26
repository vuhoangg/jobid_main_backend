"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuggestion = exports.updateSuggestion = void 0;
const SuggestionRepository_1 = __importDefault(require("../../../db/repositories/SuggestionRepository"));
const permission_1 = require("../../../helpers/permission");
function updateSuggestion(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return SuggestionRepository_1.default.update(args.input);
        }
    }
}
exports.updateSuggestion = updateSuggestion;
function createSuggestion(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return SuggestionRepository_1.default.create(args.input);
        }
    }
}
exports.createSuggestion = createSuggestion;
//# sourceMappingURL=update.js.map