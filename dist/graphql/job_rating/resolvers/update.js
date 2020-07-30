"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobRating = exports.updateJobRating = void 0;
const JobRatingRepository_1 = __importDefault(require("../../../db/repositories/JobRatingRepository"));
function updateJobRating(source, args, context, info) {
    if (context.isAuthenticated()) {
        let input = args.input;
        return JobRatingRepository_1.default.update(input).then(data => data);
    }
}
exports.updateJobRating = updateJobRating;
function createJobRating(source, args, context, info) {
    if (context.isAuthenticated()) {
        let input = args.input;
        return JobRatingRepository_1.default.create(input).then(r => r);
    }
}
exports.createJobRating = createJobRating;
//# sourceMappingURL=update.js.map