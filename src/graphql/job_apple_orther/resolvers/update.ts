import JobApplyOrtherService from "../../../db/repositories/JobApplyOrtherRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobApplyOrther = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id, status: "pending" });
    return JobApplyOrtherService.applyJob(input).then(async (data) => {
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
    });
  }
};
export const updateStatusJobApplyOrther = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    return JobApplyOrtherService.update(input);
  }
};
