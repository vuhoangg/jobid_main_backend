import { GraphQLNonNull } from "graphql";
import { JobCommentReply, JobCommentReplyInput } from "../types";
import { updateJobReplyComment, createJobReplyComment } from "../resolvers/update";

const jobReplyommentMutations = {
  jobReplyCommentCreate: {
    args: { input: { type: GraphQLNonNull(JobCommentReplyInput) } },
    resolve: (source, args, context, info) => createJobReplyComment(source, args, context, info),
    type: new GraphQLNonNull(JobCommentReply),
  },
  jobReplyCommentUpdate: {
    args: { input: { type: GraphQLNonNull(JobCommentReplyInput) } },
    resolve: (source, args, context, info) => updateJobReplyComment(source, args, context, info),
    type: new GraphQLNonNull(JobCommentReply),
  },
};
export default jobReplyommentMutations;
