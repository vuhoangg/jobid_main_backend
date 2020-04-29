import {GraphQLNonNull} from "graphql";
import {JobPost, JobPostInput} from "../types";
import {createJobPost, updateJobPost} from "../resolvers/update";

const jobPostMutations = {
    jobPostUpdate: {
        args: {input: {type: GraphQLNonNull(JobPostInput)}},
        resolve: (source, args, context, info) => updateJobPost(source, args, context, info),
        type: new GraphQLNonNull(JobPost),
    },
    jobPostCreate: {
        args: {input: {type: GraphQLNonNull(JobPostInput)}},
        resolve: (source, args, context, info) => createJobPost(source, args, context, info),
        type: new GraphQLNonNull(JobPost),
    },
};
export default jobPostMutations;
