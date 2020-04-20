import {GraphQLNonNull} from "graphql";
import {JobTitle, JobTitleInput} from "../types";
import {createJobTitle, updateJobTitle} from "../resolvers/update";

const jobTitleMutations = {
    jobTitleUpdate: {
        args: {input: {type: GraphQLNonNull(JobTitleInput)}},
        resolve: (source, args, context, info) => updateJobTitle(source, args, context, info),
        type: new GraphQLNonNull(JobTitle),
    },
    jobTitleCreate: {
        args: {input: {type: GraphQLNonNull(JobTitleInput)}},
        resolve: (source, args, context, info) => createJobTitle(source, args, context, info),
        type: new GraphQLNonNull(JobTitle),
    },
};
export default jobTitleMutations;