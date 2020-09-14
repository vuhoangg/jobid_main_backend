import JobSaveService from "../../../db/repositories/JobSaveRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobSave = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });
    return JobSaveService.saveJob(input);
  }
};
