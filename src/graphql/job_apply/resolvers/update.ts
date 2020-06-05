import JobApplyService from "../../../db/repositories/JobApplyRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";

export function updateJobApply(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobApplyService.applyJob(input).then(async (r1) => {
      let jobPost = await JobPostService.get(input.job_post, {});
      let target = jobPost.user;
      let notification = {
        type: "user",
        subject: "user_apply_job",
        target: {
          object_type: "user",
          ref: target
        },
        message: `${loggedUser.first_name} ${loggedUser.last_name} đã ứng tuyển tin tuyển dụng ${jobPost.title}`,
        href: jobPost.slug,
        read: false,
      }
      await NotificationService.create(notification);
    });
  }
}
