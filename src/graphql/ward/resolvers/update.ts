import { isSuperUser } from "../../../helpers/permission";
import WardService from "../../../db/repositories/WardRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateWard = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return WardService.update(input);
    }
  } else {
    return null;
  }
};
