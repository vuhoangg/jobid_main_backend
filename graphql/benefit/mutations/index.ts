import {GraphQLNonNull} from "graphql";
import {JobLevel, JobLevelInput} from "../types";
import {createJobLevel, updateJobLevel} from "../resolvers/update";

const jobLevelMutations = {
    jobLevelUpdate: {
        args: {input: {type: GraphQLNonNull(JobLevelInput)}},
        resolve: (source, args, context, info) => updateJobLevel(source, args, context, info),
        type: new GraphQLNonNull(JobLevel),
    },
    jobLevelCreate: {
        args: {input: {type: GraphQLNonNull(JobLevelInput)}},
        resolve: (source, args, context, info) => createJobLevel(source, args, context, info),
        type: new GraphQLNonNull(JobLevel),
    },
};
export default jobLevelMutations;