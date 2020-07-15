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
exports.updateJobApply = void 0;
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
function updateJobApply(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id, status: 'pending' });
        return JobApplyRepository_1.default.applyJob(input).then((data) => __awaiter(this, void 0, void 0, function* () {
            let jobPost = yield JobPostRepository_1.default.get(input.job_post, {});
            let target = jobPost.user;
            let notification = {
                type: "user",
                subject: "user_apply_job",
                target: {
                    object_type: "user",
                    ref: target.ref,
                },
                message: `${loggedUser.first_name} ${loggedUser.last_name} đã ứng tuyển tin tuyển dụng ${jobPost.title}`,
                href: jobPost.slug,
                read: false,
            };
            // await NotificationService.create(notification).then((r) => {
            //   if (target.ref.toString() !== loggedUser._id.toString()) {
            //     const params = {
            //       token: process.env.SOCKET_TOKEN as string,
            //     };
            //     api("POST", `${process.env.SOCKET_SERVER_URL}/socket/notify/${target.ref}`, params, {
            //       data: {
            //         ...r.toObject(),
            //         created_at: new Date(r.created_at).getTime().toString(),
            //         updated_at: new Date(r.updated_at).getTime().toString(),
            //       },
            //       type: "studio",
            //     })
            //       .then((res) => console.log(res))
            //       .catch((e) => console.log(e));
            //   }
            // });
            return data;
        }));
    }
}
exports.updateJobApply = updateJobApply;
//# sourceMappingURL=update.js.map