import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobRating, getJobRatings} from "../resolvers/get";
import {JobRating, JobRatingArguments, JobRatingConnection} from "../types";

const jobRatingQueries = {
  jobRating: {
    args: JobRatingArguments,
    resolve: (source, args, context, info) => getJobRating(source, args, context, info),
    type: new GraphQLNonNull(JobRating),
  },
  jobRatings: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobRatings(source, args, context, info),
    type: new GraphQLNonNull(JobRatingConnection),
  }
};
export default jobRatingQueries;
