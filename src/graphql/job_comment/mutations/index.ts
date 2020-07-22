import { GraphQLNonNull } from "graphql";
import { JobComment, JobCommentInput } from "../types";
import { updateJobComment, createJobComment } from "../resolvers/update";

const jobCommentMutations = {
  jobCommentCreate: {
    args: { input: { type: GraphQLNonNull(JobCommentInput) } },
    resolve: (source, args, context, info) => createJobComment(source, args, context, info),
    type: new GraphQLNonNull(JobComment),
  },
  jobCommentUpdate: {
    args: { input: { type: GraphQLNonNull(JobCommentInput) } },
    resolve: (source, args, context, info) => updateJobComment(source, args, context, info),
    type: new GraphQLNonNull(JobComment),
  },
};
export default jobCommentMutations;
