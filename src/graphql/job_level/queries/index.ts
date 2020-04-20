import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobLevel, getJobLevels} from "../resolvers/get";
import {JobLevel, JobLevelArguments, JobLevelConnection} from "../types";

const jobLevelQueries = {
    jobLevel: {
        args: JobLevelArguments,
        resolve: (source, args, context, info) => getJobLevel(source, args, context, info),
        type: new GraphQLNonNull(JobLevel),
    },
    jobLevels: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobLevels(source, args, context, info),
        type: new GraphQLNonNull(JobLevelConnection),
    }
};
export default jobLevelQueries;