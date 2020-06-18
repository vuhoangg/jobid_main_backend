import GroupPermissionService from "../../../db/repositories/GroupPermissionRepository";

export function updateGroupPermission(source, args, context, info) {
  if (context.isAuthenticated()) {
    return GroupPermissionService.update(args.input);
  }
}
export function createGroupPermission(source, args, context, info) {
  if (context.isAuthenticated()) {
    return GroupPermissionService.create(args.input);
  }
}
