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
exports.createJobPost = exports.updateJobPost = void 0;
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const ActivityRepository_1 = __importDefault(require("../../../db/repositories/ActivityRepository"));
const string_1 = require("../../../helpers/string");
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
function updateJobPost(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        // TODO in_company
        return JobPostRepository_1.default.get(input._id, {}).then(r1 => {
            if (r1 && r1.user === loggedUser._id) {
                input = Object.assign(input, { user: { ref: loggedUser._id, in_company: 0 } });
                return JobPostRepository_1.default.update(input);
            }
            else {
                return r1;
            }
        });
    }
}
exports.updateJobPost = updateJobPost;
function createJobPost(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        let slug = string_1.toSlug(input.title, true);
        let activity = {
            name: `${loggedUser.first_name} ${loggedUser.last_name}`,
            vi_message: input.title,
            en_message: input.title,
            href_type: "job_post",
            href_url: slug,
        };
        let notification = {
            type: "user",
            subject: "user_post_job",
            target: {
                object_type: "user",
                ref: loggedUser._id
            },
            message: "Tin tuyển dụng của bạn đã được đăng tải. Cảm ơn bạn đã sử dụng Kết Nối Việc!",
            href: slug,
            read: false,
        };
        input = Object.assign(input, { slug: slug });
        // TODO in_company check post from company internal
        // TODO validate input create
        input = Object.assign(input, { user: { ref: loggedUser._id, in_company: 0 } });
        return JobPostRepository_1.default.create(input).then((r) => __awaiter(this, void 0, void 0, function* () {
            yield ActivityRepository_1.default.create(activity);
            yield NotificationRepository_1.default.create(notification);
            return r;
        }));
    }
}
exports.createJobPost = createJobPost;
//# sourceMappingURL=update.js.map