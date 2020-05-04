import JobPostService from "../../../db/repositories/JobPostRepository";
import ActivityService from "../../../db/repositories/ActivityRepository";
import {toSlug} from "../../../helpers/string";

export function updateJobPost(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobPostService.update(input);
  }
}

export function createJobPost(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    let slug = toSlug(input.title, true);

    let activity = {
      name: `${loggedUser.first_name} ${loggedUser.last_name}`,
      vi_message: input.title,
      en_message: input.title,
      href_type: "job_post",
      href_url: slug,
    };

    input = Object.assign(input, {slug: slug});
    input = Object.assign(input, {user: loggedUser._id});
    return JobPostService.create(input).then(async (r) => {
      await ActivityService.create(activity);
      return r;
    });
  }
}
