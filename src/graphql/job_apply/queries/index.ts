import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobApply, getJobApplys} from "../resolvers/get";
import {JobApply, JobApplyArguments, JobApplyConnection} from "../types";

const jobApplyQueries = {
  jobApply: {
    args: JobApplyArguments,
    resolve: (source, args, context, info) => getJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
  jobApplys: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobApplys(source, args, context, info),
    type: new GraphQLNonNull(JobApplyConnection),
  }
};
export default jobApplyQueries;
