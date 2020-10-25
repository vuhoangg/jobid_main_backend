import JobPostService from "../../../db/repositories/JobPostRepository";
import ActivityService from "../../../db/repositories/ActivityRepository";
import { toSlug } from "../../../helpers/string";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";
import JobViewService from "../../../db/repositories/JobViewRepository";

export const updateJobPost = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;

    let input = args.input;

    if (isSuperUser(loggedUser.email)) {
      return JobPostService.update(input);
    } else {
      return JobPostService.get(input._id, {}).then((r1) => {
        if (r1 && r1.user.toString() == loggedUser._id.toString()) {
          return JobPostService.update(input);
        } else {
          return r1;
        }
      });
    }
  }
};

export const createJobPost = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
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
        ref: loggedUser._id,
      },
      message: "Tin tuyển dụng của bạn đã được đăng tải. Cảm ơn bạn đã sử dụng Kết Nối Việc!",
      href: slug,
      read: false,
    };

    input = Object.assign(input, { slug: slug });
    input = Object.assign(input, { user: loggedUser._id });

    return JobPostService.create(input).then(async (r) => {
      await ActivityService.create(activity);
      await NotificationService.create(notification);
      return r;
    });
  }
};


export const trackingBySlug = async (source, args, context, info) => {
  let input = args.input;
  let jobPost = await JobPostService.increaseViewCountBySlug(input.slug);
  let isAuthenticated = await authenticate(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let payload = {
      job_post: jobPost._id,
      user: loggedUser._id,
    }
    await JobViewService.create(payload);
  }
  return {
    status: true
  }
}