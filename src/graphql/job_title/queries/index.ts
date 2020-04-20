import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobTitle, getJobTitles} from "../resolvers/get";
import {JobTitle, JobTitleArguments, JobTitleConnection} from "../types";

const jobTitleQueries = {
    jobTitle: {
        args: JobTitleArguments,
        resolve: (source, args, context, info) => getJobTitle(source, args, context, info),
        type: new GraphQLNonNull(JobTitle),
    },
    jobTitles: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobTitles(source, args, context, info),
        type: new GraphQLNonNull(JobTitleConnection),
    }
};
export default jobTitleQueries;