import { GraphQLNonNull } from "graphql";
import { JobApplyOther, JobApplyOtherInput } from "../types";
import { updateJobApplyOther, updateStatusJobApplyOther } from "../resolvers/update";

const jobApplyOtherMutations = {
  jobApplyOtherUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyOtherInput) } },
    resolve: (source, args, context, info) => updateJobApplyOther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOther),
  },
  jobStatusApplyOtherUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyOtherInput) } },
    resolve: (source, args, context, info) => updateStatusJobApplyOther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOther),
  },
};
export default jobApplyOtherMutations;
