import JobApplyService from "../../../db/repositories/JobApplyRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";


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

export const employerUpdateJobApply = async (source, args, context, info) => {
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    let input = args.input;
    let jobApply = await JobApplyService.get(input._id, {});

    if (jobApply.status == "pending") {
      let jobPost = await JobPostService.get(jobApply.job_post, {});

      if (loggedEmployer._id == jobPost.employer) {
        return JobApplyService.update(input);
      }
    }
  }
};
