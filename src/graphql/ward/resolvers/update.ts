import { isSuperUser } from "../../../helpers/permission";
import WardService from "../../../db/repositories/WardRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateWard = async (args, context) => {
  // TODO Admin and User has permission
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return WardService.update(input);
    }
  } else {
    return null;
  }
};
