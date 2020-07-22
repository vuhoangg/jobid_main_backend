import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobComment, getJobComments} from "../resolvers/get";
import {JobComment, JobCommentArguments, JobCommentConnection} from "../types";

const jobCommentQueries = {
  jobComment: {
    args: JobCommentArguments,
    resolve: (source, args, context, info) => getJobComment(source, args, context, info),
    type: new GraphQLNonNull(JobComment),
  },
  jobComments: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobComments(source, args, context, info),
    type: new GraphQLNonNull(JobCommentConnection),
  }
};
export default jobCommentQueries;
