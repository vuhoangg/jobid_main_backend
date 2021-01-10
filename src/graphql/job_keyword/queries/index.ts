import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getJobKeyword, getJobKeywords } from "../resolvers/get";
import { JobKeyword, JobKeywordArguments, JobKeywordConnection } from "../types";

const jobKeywordQueries = {
    jobKeyword: {
        args: JobKeywordArguments,
        resolve: (source, args, context, info) => getJobKeyword(source, args, context, info),
        type: JobKeyword,
    },
    jobKeywords: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobKeywords(source, args, context, info),
        type: new GraphQLNonNull(JobKeywordConnection),
    }
};
export default jobKeywordQueries;