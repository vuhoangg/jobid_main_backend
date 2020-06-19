import {isSuperUser} from "../../../helpers/permission";

export function getWebsiteRole(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedInUser = context.user;
    let email = loggedInUser.email;

    if (isSuperUser(email)) {
      return {
        role: "super_admin"
      }
    }
  }
  return {
    role: "member"
  }
}
