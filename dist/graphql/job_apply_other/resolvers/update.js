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
exports.updateStatusJobApplyOther = exports.updateJobApplyOther = void 0;
const JobApplyOtherRepository_1 = __importDefault(require("../../../db/repositories/JobApplyOtherRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const updateJobApplyOther = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id, status: "pending" });
        return JobApplyOtherRepository_1.default.applyJob(input).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            // let jobPost = await JobPostService.get(input.job_post, {});
            // let target = jobPost.user;
            // let notification = {
            //   type: "user",
            //   subject: "user_apply_job",
            //   target: {
            //     object_type: "user",
            //     ref: target.ref,
            //   },
            //   message: `${loggedUser.first_name} ${loggedUser.last_name} đã ứng tuyển tin tuyển dụng ${jobPost.title}`,
            //   href: jobPost.slug,
            //   read: false,
            // };
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
});
exports.updateJobApplyOther = updateJobApplyOther;
const updateStatusJobApplyOther = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let input = args.input;
        return JobApplyOtherRepository_1.default.update(input);
    }
});
exports.updateStatusJobApplyOther = updateStatusJobApplyOther;
//# sourceMappingURL=update.js.map