import { isSuperUser } from "../../../helpers/permission";
import CityService from "../../../db/repositories/CityRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateCity = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CityService.update(input);
    }
  } else {
    return null;
  }
};
