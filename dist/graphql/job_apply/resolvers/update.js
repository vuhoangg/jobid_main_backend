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
const EmployerRepository_1 = __importDefault(require("../../../db/repositories/EmployerRepository"));
const mail_1 = require("../../../mail");
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const log_1 = require("../../../helpers/log");
const createJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id, status: "pending" });
        let data = yield JobApplyRepository_1.default.create(input);
        try {
            let jobPost = yield JobPostRepository_1.default.get(input.job_post, {});
            let employer = yield EmployerRepository_1.default.get(jobPost.employer, {});
            let job_post_title = jobPost.title;
            let user_name = `${loggedUser.full_name}`;
            let employer_name = `${employer.first_name} ${employer.last_name}`.trim();
            let detail_link = `${process.env.STUDIO_URL}/ung-tuyen/dang-cho`;
            let mailData = JSON.stringify({
                "{{job_post_title}}": job_post_title,
                "{{user_name}}": user_name,
                "{{employer_name}}": employer_name,
                "{{detail_link}}": detail_link,
            });
            yield (0, mail_1.sendEmployerUserApply)(employer.email, employer_name, mailData);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
        }
        // == followup email -= //
        // -- end followup email == //
        return data;
    }
});
exports.createJobApply = createJobApply;
const employerUpdateJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        let jobApply = yield JobApplyRepository_1.default.get(input._id, {});
        if (jobApply.status == "pending") {
            let jobPost = yield JobPostRepository_1.default.get(jobApply.job_post, {});
            if (loggedEmployer._id == jobPost.employer) {
                let r = yield JobApplyRepository_1.default.update(input);
                // == followup email -= //
                try {
                    let user = yield UserRepository_1.default.get(jobApply.user, {});
                    let user_name = user.full_name || `${user.first_name} ${user.last_name}`.trim();
                    let job_post_title = jobPost.title;
                    let company_name = jobPost.company.name || "";
                    let detail_link = `${process.env.SITE_URL}/viec-lam/${jobPost.slug}`;
                    let mailData = JSON.stringify({
                        "{{job_post_title}}": job_post_title,
                        "{{user_name}}": user_name,
                        "{{company_name}}": company_name,
                        "{{detail_link}}": detail_link,
                    });
                    if (input.status == "approve") {
                        yield (0, mail_1.sendUserApproveCv)(user.email, user_name, mailData);
                    }
                    else if (input.status == "decline") {
                        yield (0, mail_1.sendUserDeclineCv)(user.email, user_name, mailData);
                    }
                }
                catch (e) {
                    (0, log_1.errorLog)(e);
                }
                // -- end followup email == //
                return r;
            }
        }
    }
});
exports.employerUpdateJobApply = employerUpdateJobApply;
//# sourceMappingURL=update.js.map