import JobApplyService from "../../../db/repositories/JobApplyRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
import { authenticateUser } from "../../../middlewares/authenticate";


export const createJobApply = async (source, args, context, info) => {
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;

    input = Object.assign(input, { user: loggedUser._id, status: "pending" });

    let data = await JobApplyService.create(input);
    return data;
  }
}

export const updateJobApply = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;

    let jobPost = await JobPostService.get(input.job_post, {});
    let target = jobPost.user;

    input = Object.assign(input, { user: loggedUser._id, target: target, status: "pending" });

    return JobApplyService.applyJob(input).then(async (data) => {
      let notification = {
        type: "user",
        subject: "user_apply_job",
        target: {
          object_type: "user",
          ref: target,
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
    });
  }
};
export const updateStatusJobApply = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return JobApplyService.update(input);
  }
};
