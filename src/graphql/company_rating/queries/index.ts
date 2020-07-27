import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getCompanyRating, getCompanyRatings} from "../resolvers/get";
import {CompanyRating, CompanyRatingArguments, CompanyRatingConnection} from "../types";

const companyRatingQueries = {
  jobRating: {
    args: CompanyRatingArguments,
    resolve: (source, args, context, info) => getCompanyRating(source, args, context, info),
    type: new GraphQLNonNull(CompanyRating),
  },
  jobRatings: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCompanyRatings(source, args, context, info),
    type: new GraphQLNonNull(CompanyRatingConnection),
  }
};
export default companyRatingQueries;
