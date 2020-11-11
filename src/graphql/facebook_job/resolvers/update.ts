import { isSuperUser } from "../../../helpers/permission";
import FacebookJobService from "../../../db/repositories/FacebookJobRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateFacebookJob = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return FacebookJobService.update(input);
    }
  } else {
    return null;
  }
};
