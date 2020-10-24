import { GraphQLNonNull } from "graphql";
import { CompanyFollow, CompanyFollowInput } from "../types";
import { createCompanyFollow, deleteCompanyFollow } from "../resolvers/update";

const companyFollowMutations = {
  companyFollowCreate: {
    args: { input: { type: GraphQLNonNull(CompanyFollowInput) } },
    resolve: (source, args, context, info) => createCompanyFollow(source, args, context, info),
    type: CompanyFollow,
  },
  companyFollowDelete: {
    args: { input: { type: GraphQLNonNull(CompanyFollowInput) } },
    resolve: (source, args, context, info) => deleteCompanyFollow(source, args, context, info),
    type: CompanyFollow,
  },
};
export default companyFollowMutations;
