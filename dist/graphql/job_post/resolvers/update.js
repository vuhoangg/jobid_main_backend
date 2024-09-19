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
exports.trackingBySlug = exports.createJobPost = exports.updateJobPost = void 0;
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const string_1 = require("../../../helpers/string");
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
const JobViewRepository_1 = __importDefault(require("../../../db/repositories/JobViewRepository"));
const mail_1 = require("../../../mail");
const updateJobPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        if ((0, permission_1.isSuperUser)(loggedEmployer.email)) {
            return JobPostRepository_1.default.update(input);
        }
        else {
            let r1 = yield JobPostRepository_1.default.get(input._id, {});
            if (r1 && r1.employer.toString() == loggedEmployer._id.toString()) {
                return JobPostRepository_1.default.update(input);
            }
            else {
                return r1;
            }
        }
    }
});
exports.updateJobPost = updateJobPost;
const createJobPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        let slug = (0, string_1.toSlug)(input.title, true);
        input = Object.assign(input, { slug: slug });
        input = Object.assign(input, { employer: loggedEmployer._id });
        let r = yield JobPostRepository_1.default.create(input);
        // == followup email -= //
        let job_post_title = r.title;
        let employer_name = `${loggedEmployer.first_name} ${loggedEmployer.last_name}`.trim();
        let detail_link = `${process.env.SITE_URL}/viec-lam/${slug}`;
        let mailData = JSON.stringify({
            "{{job_post_title}}": job_post_title,
            "{{employer_name}}": employer_name,
            "{{detail_link}}": detail_link,
        });
        yield (0, mail_1.sendEmployerNewJobPost)(loggedEmployer.email, employer_name, mailData);
        // -- end followup email == //
        return r;
    }
});
exports.createJobPost = createJobPost;
const trackingBySlug = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    let jobPost = yield JobPostRepository_1.default.increaseViewCountBySlug(input.slug);
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let payload = {
            job_post: jobPost._id,
            user: loggedUser._id,
        };
        yield JobViewRepository_1.default.create(payload);
    }
    return {
        status: true
    };
});
exports.trackingBySlug = trackingBySlug;
//# sourceMappingURL=update.js.map