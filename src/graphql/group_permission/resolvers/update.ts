import GroupPermissionService from "../../../db/repositories/GroupPermissionRepository";
import { isSuperUser } from "../../../helpers/permission";

export function updateGroupPermission(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return GroupPermissionService.update(args.input);
    }
  }
}
export function createGroupPermission(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return GroupPermissionService.create(args.input);
    }
  }
}
