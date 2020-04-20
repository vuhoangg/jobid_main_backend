import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobCategory, getJobCategorys} from "../resolvers/get";
import {JobCategory, JobCategoryArguments, JobCategoryConnection} from "../types";

const jobCategoryQueries = {
    jobCategory: {
        args: JobCategoryArguments,
        resolve: (source, args, context, info) => getJobCategory(source, args, context, info),
        type: new GraphQLNonNull(JobCategory),
    },
    jobCategorys: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobCategorys(source, args, context, info),
        type: new GraphQLNonNull(JobCategoryConnection),
    }
};
export default jobCategoryQueries;