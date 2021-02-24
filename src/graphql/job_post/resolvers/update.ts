import JobPostService from "../../../db/repositories/JobPostRepository";
import ActivityService from "../../../db/repositories/ActivityRepository";
import { toSlug } from "../../../helpers/string";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";
import JobViewService from "../../../db/repositories/JobViewRepository";
import { sendEmployerNewJobPost } from "../../../mail";

export const updateJobPost = async (source, args, context, info) => {
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;

    let input = args.input;

    if (isSuperUser(loggedEmployer.email)) {
      return JobPostService.update(input);
    } else {
      let r1 = await JobPostService.get(input._id, {});
      if (r1 && r1.employer.toString() == loggedEmployer._id.toString()) {
        return JobPostService.update(input);
      } else {
        return r1;
      }
    }
  }
};

export const createJobPost = async (source, args, context, info) => {
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    let input = args.input;
    let slug = toSlug(input.title, true);

    input = Object.assign(input, { slug: slug });
    input = Object.assign(input, { employer: loggedEmployer._id });
    let r = await JobPostService.create(input);

    // == followup email -= //
    let job_post_title = r.title;
    let employer_name = `${loggedEmployer.first_name} ${loggedEmployer.last_name}`.trim();
    let detail_link = `${process.env.SITE_URL}/viec-lam/${slug}`;

    let mailData = JSON.stringify({
      "{{job_post_title}}": job_post_title,
      "{{employer_name}}": employer_name,
      "{{detail_link}}": detail_link,
    });
    await sendEmployerNewJobPost(loggedEmployer.email, employer_name, mailData);
    // -- end followup email == //

    return r;
  }
};


export const trackingBySlug = async (source, args, context, info) => {
  let input = args.input;
  let jobPost = await JobPostService.increaseViewCountBySlug(input.slug);
  let isAuthenticated = await authenticateUser(context, context.res);
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
