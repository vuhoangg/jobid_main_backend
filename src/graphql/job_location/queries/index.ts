import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobLocation, getJobLocations} from "../resolvers/get";
import {JobLocation, JobLocationArguments, JobLocationConnection} from "../types";

const jobLocationQueries = {
    jobLocation: {
        args: JobLocationArguments,
        resolve: (source, args, context, info) => getJobLocation(source, args, context, info),
        type: new GraphQLNonNull(JobLocation),
    },
    jobLocations: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobLocations(source, args, context, info),
        type: new GraphQLNonNull(JobLocationConnection),
    }
};
export default jobLocationQueries;