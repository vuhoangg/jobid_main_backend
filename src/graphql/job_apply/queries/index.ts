import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getJobApply, getJobApplys, getEmployerJobApply, getEmployerJobApplys } from "../resolvers/get";
import { JobApply, JobApplyArguments, JobApplyConnection } from "../types";

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
  },

  employerJobApply: {
    args: JobApplyArguments,
    resolve: (source, args, context, info) => getEmployerJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
  employerJobApplys: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getEmployerJobApplys(source, args, context, info),
    type: new GraphQLNonNull(JobApplyConnection),
  },
};
export default jobApplyQueries;
