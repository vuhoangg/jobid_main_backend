import {isSuperUser} from "../../../helpers/permission";
import WardService from "../../../db/repositories/WardRepository";

export const updateWard = (args, context) => {
  // TODO Admin and User has permission
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return WardService.update(input);
    }
  } else {
    return null;
  }
};
