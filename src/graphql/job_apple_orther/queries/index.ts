import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getJobApplyOrther, getJobApplysOrther } from "../resolvers/get";
import { JobApplyOrther, JobApplyOrtherArguments, JobApplyOrtherConnection } from "../types";

const jobApplyOrtherQueries = {
  jobApplyOrther: {
    args: JobApplyOrtherArguments,
    resolve: (source, args, context, info) => getJobApplyOrther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOrther),
  },
  jobApplysOrther: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobApplysOrther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOrther),
  },
};
export default jobApplyOrtherQueries;
