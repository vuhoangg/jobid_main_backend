import JobTitleService from "../../../db/repositories/JobTitleRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobTitle = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobTitleService.update(args.input);
    }
  }
};
export const createJobTitle = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobTitleService.create(args.input);
    }
  }
};
