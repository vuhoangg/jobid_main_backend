import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobReplyComment, getJobReplyComments} from "../resolvers/get";
import {JobCommentReply, JobCommentReplyArguments, JobCommentReplyConnection} from "../types";

const jobReplyCommentQueries = {
  jobReplyComment: {
    args: JobCommentReplyArguments,
    resolve: (source, args, context, info) => getJobReplyComment(source, args, context, info),
    type: new GraphQLNonNull(JobCommentReply),
  },
  jobReplyComments: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobReplyComments(source, args, context, info),
    type: new GraphQLNonNull(JobCommentReplyConnection),
  }
};
export default jobReplyCommentQueries;
