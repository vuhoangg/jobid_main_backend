import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobPost, getJobPosts} from "../resolvers/get";
import {JobPost, JobPostArguments, JobPostConnection} from "../types";

const jobPostQueries = {
    jobPost: {
        args: JobPostArguments,
        resolve: (source, args, context, info) => getJobPost(source, args, context, info),
        type: new GraphQLNonNull(JobPost),
    },
    jobPosts: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobPosts(source, args, context, info),
        type: new GraphQLNonNull(JobPostConnection),
    }
};
export default jobPostQueries;
