import JobCategoryService from "../../../db/repositories/JobCategoryRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobCategory = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobCategoryService.update(args.input);
    }
  }
};
export const createJobCategory = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobCategoryService.create(args.input);
    }
  }
};
