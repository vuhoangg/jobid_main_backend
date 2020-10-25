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
const ActivityRepository_1 = __importDefault(require("../../../db/repositories/ActivityRepository"));
const string_1 = require("../../../helpers/string");
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
const JobViewRepository_1 = __importDefault(require("../../../db/repositories/JobViewRepository"));
exports.updateJobPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobPostRepository_1.default.update(input);
        }
        else {
            return JobPostRepository_1.default.get(input._id, {}).then((r1) => {
                if (r1 && r1.user.toString() == loggedUser._id.toString()) {
                    return JobPostRepository_1.default.update(input);
                }
                else {
                    return r1;
                }
            });
        }
    }
});
exports.createJobPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let slug = string_1.toSlug(input.title, true);
        let activity = {
            name: `${loggedUser.first_name} ${loggedUser.last_name}`,
            message: input.title,
            href_type: "job_post",
            href_url: slug,
        };
        let notification = {
            type: "user",
            subject: "user_post_job",
            target: {
                object_type: "user",
                ref: loggedUser._id,
            },
            message: "Tin tuyển dụng của bạn đã được đăng tải. Cảm ơn bạn đã sử dụng Kết Nối Việc!",
            href: slug,
            read: false,
        };
        input = Object.assign(input, { slug: slug });
        input = Object.assign(input, { user: loggedUser._id });
        return JobPostRepository_1.default.create(input).then((r) => __awaiter(void 0, void 0, void 0, function* () {
            yield ActivityRepository_1.default.create(activity);
            yield NotificationRepository_1.default.create(notification);
            return r;
        }));
    }
});
exports.trackingBySlug = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    let jobPost = yield JobPostRepository_1.default.increaseViewCountBySlug(input.slug);
    let isAuthenticated = yield authenticate_1.authenticate(context, context.res);
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
//# sourceMappingURL=update.js.map