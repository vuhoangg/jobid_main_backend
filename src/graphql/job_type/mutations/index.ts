import {GraphQLNonNull} from "graphql";
import {JobType, JobTypeInput} from "../types";
import {createJobType, updateJobType} from "../resolvers/update";

const jobTypeMutations = {
    jobTypeUpdate: {
        args: {input: {type: GraphQLNonNull(JobTypeInput)}},
        resolve: (source, args, context, info) => updateJobType(source, args, context, info),
        type: new GraphQLNonNull(JobType),
    },
    jobTypeCreate: {
        args: {input: {type: GraphQLNonNull(JobTypeInput)}},
        resolve: (source, args, context, info) => createJobType(source, args, context, info),
        type: new GraphQLNonNull(JobType),
    },
};
export default jobTypeMutations;
