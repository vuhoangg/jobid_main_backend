import { isSuperUser } from "../../../helpers/permission";
import FacebookJobService from "../../../db/repositories/FacebookJobRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateFacebookJob = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return FacebookJobService.update(input);
    }
  } else {
    return null;
  }
};
