import JobApplyService from "../../../db/repositories/JobApplyRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";
import EmployerService from "../../../db/repositories/EmployerRepository";
import { sendEmployerUserApply, sendUserApproveCv, sendUserDeclineCv } from "../../../mail";
import UserService from "../../../db/repositories/UserRepository";
import {errorLog} from "../../../helpers/log";


export const createJobApply = async (source, args, context, info) => {
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;

    input = Object.assign(input, { user: loggedUser._id, status: "pending" });

    let data = await JobApplyService.create(input);

    try {
      let jobPost = await JobPostService.get(input.job_post, {});
      let employer = await EmployerService.get(jobPost.employer, {});

      let job_post_title = jobPost.title;
      let user_name = `${loggedUser.full_name}`;
      let employer_name = `${employer.first_name} ${employer.last_name}`.trim();
      let detail_link = `${process.env.STUDIO_URL}/ung-tuyen/dang-cho`;
      let mailData = JSON.stringify({
        "{{job_post_title}}": job_post_title,
        "{{user_name}}": user_name,
        "{{employer_name}}": employer_name,
        "{{detail_link}}": detail_link,
      });
      await sendEmployerUserApply(employer.email, employer_name, mailData);
    } catch (e) {
      errorLog(e);
    }
    // == followup email -= //

    // -- end followup email == //

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

        let r = await JobApplyService.update(input);


        // == followup email -= //
        try {
          let user = await UserService.get(jobApply.user, {});
          let user_name = user.full_name || `${user.first_name} ${user.last_name}`.trim();
          let job_post_title = jobPost.title;
          let company_name = jobPost.company.name || "";
          let detail_link = `${process.env.SITE_URL}/viec-lam/${jobPost.slug}`;

          let mailData = JSON.stringify({
            "{{job_post_title}}": job_post_title,
            "{{user_name}}": user_name,
            "{{company_name}}": company_name,
            "{{detail_link}}": detail_link,
          });

          if (input.status == "approve") {
            await sendUserApproveCv(user.email, user_name, mailData);
          } else if (input.status == "decline") {
            await sendUserDeclineCv(user.email, user_name, mailData);
          }
        } catch (e) {
          errorLog(e)
        }

        // -- end followup email == //

        return r;
      }
    }
  }
};
