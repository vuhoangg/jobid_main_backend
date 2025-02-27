import JobSaveService from "../../../db/repositories/JobSaveRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobSave = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });
    return JobSaveService.saveJob(input);
  }
};
