"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandidate = exports.updateCandidate = void 0;
const CandidateRepository_1 = __importDefault(require("../../../db/repositories/CandidateRepository"));
function updateCandidate(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        return CandidateRepository_1.default.get(input._id, {}).then(r => {
            if (r && r.upload_by._id.toString() == loggedUser._id.toString()) {
                return CandidateRepository_1.default.update(args.input);
            }
            else {
                return r;
            }
        });
    }
}
exports.updateCandidate = updateCandidate;
function createCandidate(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { upload_by: loggedUser._id });
        return CandidateRepository_1.default.create(input);
    }
}
exports.createCandidate = createCandidate;
//# sourceMappingURL=update.js.map