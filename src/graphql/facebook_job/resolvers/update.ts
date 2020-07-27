import {isSuperUser} from "../../../helpers/permission";
import FacebookJobService from "../../../db/repositories/FacebookJobRepository";

export const updateFacebookJob = (args, context) => {
  // TODO Admin and User has permission
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return FacebookJobService.update(input);
    }
  } else {
    return null;
  }
};
