import { GraphQLNonNull } from "graphql";
import { JobApply, JobApplyInput } from "../types";
import { updateJobApply, updateStatusJobApply } from "../resolvers/update";

const jobApplyMutations = {
  jobApplyUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyInput) } },
    resolve: (source, args, context, info) => updateJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
  jobStatusApplyUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyInput) } },
    resolve: (source, args, context, info) => updateStatusJobApply(source, args, context, info),
    type: new GraphQLNonNull(JobApply),
  },
};
export default jobApplyMutations;
