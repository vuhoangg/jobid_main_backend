"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandidate = exports.updateCandidate = void 0;
const CandidateRepository_1 = __importDefault(require("../../../db/repositories/CandidateRepository"));
const permission_1 = require("../../../helpers/permission");
function updateCandidate(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CandidateRepository_1.default.update(args.input);
        }
    }
}
exports.updateCandidate = updateCandidate;
function createCandidate(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CandidateRepository_1.default.create(args.input);
        }
    }
}
exports.createCandidate = createCandidate;
//# sourceMappingURL=update.js.map