import { GraphQLNonNull } from "graphql";
import { createJobApply, employerUpdateJobApply } from "../resolvers/update";
import { JobApply, JobApplyInput } from "../types";

const jobApplyMutations = {
  jobApplyCreate: {
    args: { input: { type: GraphQLNonNull(JobApplyInput) } },
    resolve: (source, args, context, info) => createJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
  employerJobApplyUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyInput) } },
    resolve: (source, args, context, info) => employerUpdateJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
};
export default jobApplyMutations;
