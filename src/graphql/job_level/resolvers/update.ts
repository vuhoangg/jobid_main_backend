import JobLevelService from "../../../db/repositories/JobLevelRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobLevel = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobLevelService.update(args.input);
    }
  }
};

export const createJobLevel = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobLevelService.create(args.input);
    }
  }
};
