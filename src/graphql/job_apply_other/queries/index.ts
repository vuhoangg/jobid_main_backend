import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getJobApplyOther, getJobApplyOthers } from "../resolvers/get";
import { JobApplyOther, JobApplyOtherArguments, JobApplyOtherConnection } from "../types";

const jobApplyOtherQueries = {
  jobApplyOther: {
    args: JobApplyOtherArguments,
    resolve: (source, args, context, info) => getJobApplyOther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOther),
  },
  jobApplyOthers: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobApplyOthers(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOtherConnection),
  },
};
export default jobApplyOtherQueries;
