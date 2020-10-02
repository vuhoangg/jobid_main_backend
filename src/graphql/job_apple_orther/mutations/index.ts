import { GraphQLNonNull } from "graphql";
import { JobApplyOrther, JobApplyOrtherInput } from "../types";
import { updateJobApplyOrther, updateStatusJobApplyOrther } from "../resolvers/update";

const jobApplyOrtherMutations = {
  jobApplyOrtherUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyOrtherInput) } },
    resolve: (source, args, context, info) => updateJobApplyOrther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOrther),
  },
  jobStatusApplyOrtherUpdate: {
    args: { input: { type: GraphQLNonNull(JobApplyOrtherInput) } },
    resolve: (source, args, context, info) => updateStatusJobApplyOrther(source, args, context, info),
    type: new GraphQLNonNull(JobApplyOrther),
  },
};
export default jobApplyOrtherMutations;
