import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import {
  getJobApply,
  getJobApplys,
  getEmployerJobApply,
  getEmployerJobApplys,
  getAdminJobApply,
  getAdminJobApplys
} from "../resolvers/get";
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
  adminJobApply: {
    args: JobApplyArguments,
    resolve: (source, args, context, info) => getAdminJobApply(source, args, context, info),
    type: JobApply,
  },
  adminJobApplys: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getAdminJobApplys(source, args, context, info),
    type: JobApplyConnection,
  },
};
export default jobApplyQueries;
