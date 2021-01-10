import { GraphQLNonNull } from "graphql";
import { JobKeyword, JobKeywordInput } from "../types";
import { createJobKeyword, updateJobKeyword } from "../resolvers/update";

const jobKeywordMutations = {
    jobKeywordUpdate: {
        args: { input: { type: GraphQLNonNull(JobKeywordInput) } },
        resolve: (source, args, context, info) => updateJobKeyword(source, args, context, info),
        type: new GraphQLNonNull(JobKeyword),
    },
    jobKeywordCreate: {
        args: { input: { type: GraphQLNonNull(JobKeywordInput) } },
        resolve: (source, args, context, info) => createJobKeyword(source, args, context, info),
        type: new GraphQLNonNull(JobKeyword),
    },
};
export default jobKeywordMutations;