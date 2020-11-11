import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getWebsiteRole = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedInUser = context.res.locals.fullUser;
    let email = loggedInUser.email;

    if (isSuperUser(email)) {
      return {
        role: "super_admin",
      };
    }
  }
  return {
    role: "member",
  };
};
