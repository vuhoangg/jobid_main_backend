import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobType, getJobTypes} from "../resolvers/get";
import {JobType, JobTypeArguments, JobTypeConnection} from "../types";

const jobTypeQueries = {
    jobType: {
        args: JobTypeArguments,
        resolve: (source, args, context, info) => getJobType(source, args, context, info),
        type: new GraphQLNonNull(JobType),
    },
    jobTypes: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobTypes(source, args, context, info),
        type: new GraphQLNonNull(JobTypeConnection),
    }
};
export default jobTypeQueries;
