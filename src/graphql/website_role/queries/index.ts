import {GraphQLNonNull} from "graphql";
import {getWebsiteRole} from "../resolvers/get";
import {RoleArgument, WebsiteRole} from "../types";

const websiteRoleQueries = {
  websiteRole: {
    args: RoleArgument,
    resolve: (source, args, context, info) => getWebsiteRole(source, args, context, info),
    type: new GraphQLNonNull(WebsiteRole),
  },
};
export default websiteRoleQueries;
