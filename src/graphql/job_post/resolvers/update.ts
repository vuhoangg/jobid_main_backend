import JobPostService from "../../../db/repositories/JobPostRepository";
import ActivityService from "../../../db/repositories/ActivityRepository";
import {toSlug} from "../../../helpers/string";
import NotificationService from "../../../db/repositories/NotificationRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobPost(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;

    if (isSuperUser(loggedUser.email)) {
      return JobPostService.update(input);
    } else {
      return JobPostService.get(input._id, {}).then(r1 => {
        if (r1 && r1.user.toString() == loggedUser._id.toString()) {
          return JobPostService.update(input);
        } else {
          return r1
        }
      })
    }
  }
}

export function createJobPost(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    let slug = toSlug(input.title, true);

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
        ref: loggedUser._id
      },
      message: "Tin tuyển dụng của bạn đã được đăng tải. Cảm ơn bạn đã sử dụng Kết Nối Việc!",
      href: slug,
      read: false,
    };

    input = Object.assign(input, {slug: slug});
    input = Object.assign(input, {user: loggedUser._id});

    return JobPostService.create(input).then(async (r) => {
      await ActivityService.create(activity);
      await NotificationService.create(notification);
      return r;
    });
  }
}
