import {isSuperUser} from "../../../helpers/permission";
import CityService from "../../../db/repositories/CityRepository";

export const updateCity = (args, context) => {
  // TODO Admin and User has permission
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CityService.update(input);
    }
  } else {
    return null;
  }
};
