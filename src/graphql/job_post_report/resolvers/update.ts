import JobPostReportService from "../../../db/repositories/JobPostReportRepository";
import {authenticateUser} from "../../../middlewares/authenticate";

export const createJobPostReport = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobPostReportService.create(input);
  }
};

export const deleteJobPostReport = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});

    return JobPostReportService.getBy(input, {}).then((r1) => {
      if (r1) {
        return JobPostReportService.delete(r1._id).then(x => r1);
      } else {
        return null;
      }
    });
  }
};
