import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getGroupPermission, getGroupPermissions } from "../resolvers/get";
import { GroupPermission, GroupPermissionArguments, GroupPermissionConnection } from "../types";

const groupPermissionQueries = {
  groupPermission: {
    args: GroupPermissionArguments,
    resolve: (source, args, context, info) => getGroupPermission(source, args, context, info),
    type: new GraphQLNonNull(GroupPermission),
  },
  groupPermissions: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getGroupPermissions(source, args, context, info),
    type: new GraphQLNonNull(GroupPermissionConnection),
  },
};
export default groupPermissionQueries;
