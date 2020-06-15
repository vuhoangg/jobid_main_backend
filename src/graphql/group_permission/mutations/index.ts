import { GraphQLNonNull } from "graphql";
import { GroupPermission, GroupPermissionInput } from "../types";
import { createGroupPermission, updateGroupPermission } from "../resolvers/update";

const groupPermissionMutations = {
  groupPermissionUpdate: {
    args: { input: { type: GraphQLNonNull(GroupPermissionInput) } },
    resolve: (source, args, context, info) => updateGroupPermission(source, args, context, info),
    type: new GraphQLNonNull(GroupPermission),
  },
  groupPermissionCreate: {
    args: { input: { type: GraphQLNonNull(GroupPermissionInput) } },
    resolve: (source, args, context, info) => createGroupPermission(source, args, context, info),
    type: new GraphQLNonNull(GroupPermission),
  },
};
export default groupPermissionMutations;
