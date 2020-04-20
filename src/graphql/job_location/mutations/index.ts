import {GraphQLNonNull} from "graphql";
import {JobLocation, JobLocationInput} from "../types";
import {createJobLocation, updateJobLocation} from "../resolvers/update";

const jobLocationMutations = {
    jobLocationUpdate: {
        args: {input: {type: GraphQLNonNull(JobLocationInput)}},
        resolve: (source, args, context, info) => updateJobLocation(source, args, context, info),
        type: new GraphQLNonNull(JobLocation),
    },
    jobLocationCreate: {
        args: {input: {type: GraphQLNonNull(JobLocationInput)}},
        resolve: (source, args, context, info) => createJobLocation(source, args, context, info),
        type: new GraphQLNonNull(JobLocation),
    },
};
export default jobLocationMutations;