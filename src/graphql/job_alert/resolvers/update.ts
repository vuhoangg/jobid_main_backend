import JobAlertService from "../../../db/repositories/JobAlertRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobAlert = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });
    return JobAlertService.update(input);
  }
};
