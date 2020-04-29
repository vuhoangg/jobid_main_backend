import {GraphQLNonNull} from "graphql";
import {CompanyFollow, CompanyFollowInput} from "../types";
import {updateCompanyFollow} from "../resolvers/update";

const companyFollowMutations = {
  companyFollowUpdate: {
    args: {input: {type: GraphQLNonNull(CompanyFollowInput)}},
    resolve: (source, args, context, info) => updateCompanyFollow(source, args, context, info),
    type: new GraphQLNonNull(CompanyFollow),
  },
};
export default companyFollowMutations;
