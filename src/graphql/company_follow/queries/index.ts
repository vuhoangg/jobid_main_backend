import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getCompanyFollow, getCompanyFollows} from "../resolvers/get";
import {CompanyFollow, CompanyFollowArguments, CompanyFollowConnection} from "../types";

const companyFollowQueries = {
  companyFollow: {
    args: CompanyFollowArguments,
    resolve: (source, args, context, info) => getCompanyFollow(source, args, context, info),
    type: new GraphQLNonNull(CompanyFollow),
  },
  companyFollows: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCompanyFollows(source, args, context, info),
    type: new GraphQLNonNull(CompanyFollowConnection),
  }
};
export default companyFollowQueries;
