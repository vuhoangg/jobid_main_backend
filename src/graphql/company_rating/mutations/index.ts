import { GraphQLNonNull } from "graphql";
import { CompanyRating, CompanyRatingInput } from "../types";
import { createJobRating, updateJobRating } from "../resolvers/update";

const companyRatingMutations = {
  companyRatingCreate: {
    args: { input: { type: GraphQLNonNull(CompanyRatingInput) } },
    resolve: (source, args, context, info) => createJobRating(source, args, context, info),
    type: new GraphQLNonNull(CompanyRating),
  },
  companyRatingUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyRatingInput) } },
    resolve: (source, args, context, info) => updateJobRating(source, args, context, info),
    type: new GraphQLNonNull(CompanyRating),
  },
};
export default companyRatingMutations;
