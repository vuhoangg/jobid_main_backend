import {GraphQLNonNull} from "graphql";
import {JobCategory, JobCategoryInput} from "../types";
import {createJobCategory, updateJobCategory} from "../resolvers/update";

const jobCategoryMutations = {
    jobCategoryUpdate: {
        args: {input: {type: GraphQLNonNull(JobCategoryInput)}},
        resolve: (source, args, context, info) => updateJobCategory(source, args, context, info),
        type: new GraphQLNonNull(JobCategory),
    },
    jobCategoryCreate: {
        args: {input: {type: GraphQLNonNull(JobCategoryInput)}},
        resolve: (source, args, context, info) => createJobCategory(source, args, context, info),
        type: new GraphQLNonNull(JobCategory),
    },
};
export default jobCategoryMutations;