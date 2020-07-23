import { GraphQLNonNull } from "graphql";
import { JobRating, JobRatingInput } from "../types";
import { createJobRating, updateJobRating } from "../resolvers/update";

const jobRatingMutations = {
  jobRatingCreate: {
    args: { input: { type: GraphQLNonNull(JobRatingInput) } },
    resolve: (source, args, context, info) => createJobRating(source, args, context, info),
    type: new GraphQLNonNull(JobRating),
  },
  jobRatingUpdate: {
    args: { input: { type: GraphQLNonNull(JobRatingInput) } },
    resolve: (source, args, context, info) => updateJobRating(source, args, context, info),
    type: new GraphQLNonNull(JobRating),
  },
};
export default jobRatingMutations;
