import { isSuperUser } from "../../../helpers/permission";
import DistrictService from "../../../db/repositories/DistrictRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateDistrict = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return DistrictService.update(input);
    }
  } else {
    return null;
  }
};
