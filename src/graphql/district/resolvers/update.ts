import {isSuperUser} from "../../../helpers/permission";
import DistrictService from "../../../db/repositories/DistrictRepository";

export const updateDistrict = (args, context) => {
  // TODO Admin and User has permission
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return DistrictService.update(input);
    }
  } else {
    return null;
  }
};
