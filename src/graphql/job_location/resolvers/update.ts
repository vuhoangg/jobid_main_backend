import JobLocationService from "../../../db/repositories/JobLocationRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobLocation = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobLocationService.update(args.input);
    }
  }
};
export const createJobLocation = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobLocationService.create(args.input);
    }
  }
};
