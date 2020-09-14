import { isSuperUser } from "../../../helpers/permission";
import CityService from "../../../db/repositories/CityRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCity = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CityService.update(input);
    }
  } else {
    return null;
  }
};
