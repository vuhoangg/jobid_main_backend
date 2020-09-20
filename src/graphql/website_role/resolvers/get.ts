import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const getWebsiteRole = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedInUser = context.user;
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
