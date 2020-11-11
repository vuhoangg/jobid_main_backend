import GroupPermissionService from "../../../db/repositories/GroupPermissionRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateGroupPermission = async (source, args, context, info) => {
  // if (await authenticate(context, context.res)) {
  return GroupPermissionService.update(args.input);
  // }
};
export const createGroupPermission = async (source, args, context, info) => {
  // if (await authenticate(context, context.res)) {
  return GroupPermissionService.create(args.input);
  // }
};
