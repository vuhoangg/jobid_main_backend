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
exports.employerUpdateJobApply = exports.createJobApply = void 0;
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.createJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id, status: "pending" });
        let data = yield JobApplyRepository_1.default.create(input);
        return data;
    }
});
exports.employerUpdateJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateEmployer(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        let jobApply = yield JobApplyRepository_1.default.get(input._id, {});
        if (jobApply.status == "pending") {
            let jobPost = yield JobPostRepository_1.default.get(jobApply.job_post, {});
            if (loggedEmployer._id == jobPost.employer) {
                return JobApplyRepository_1.default.update(input);
            }
        }
    }
});
//# sourceMappingURL=update.js.map