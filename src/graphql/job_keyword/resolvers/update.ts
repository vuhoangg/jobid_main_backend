import JobKeywordService from "../../../db/repositories/JobKeywordRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobKeyword = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobKeywordService.update(args.input);
    }
  }
};

export const createJobKeyword = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobKeywordService.create(args.input);
    }
  }
};
