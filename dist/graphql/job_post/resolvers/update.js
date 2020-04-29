"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const ActivityRepository_1 = __importDefault(require("../../../db/repositories/ActivityRepository"));
const string_1 = require("../../../helpers/string");
function updateJobPost(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return JobPostRepository_1.default.update(input);
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
        ActivityRepository_1.default.create(activity);
        input = Object.assign(input, { slug: slug });
        input = Object.assign(input, { user: loggedUser._id });
        return JobPostRepository_1.default.create(input);
    }
}
exports.createJobPost = createJobPost;
//# sourceMappingURL=update.js.map