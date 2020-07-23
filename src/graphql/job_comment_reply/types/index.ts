import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";
import {JobComment} from "../../job_comment/types";


export const JobCommentReply = new GraphQLObjectType({
  description: "Represents a job comment reply.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    comment: { type: GraphQLString },
    user: { type: User },
    job: { type: JobPost },
    parent: {type: JobComment},
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobCommentReply",
});
export const JobCommentReplyEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobCommentReplyEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobCommentReply),
    },
  },
  name: "JobCommentReplyEdge",
});
export const JobCommentReplyConnection = new GraphQLObjectType({
  description: "List of job comments.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobCommentReplyEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobCommentReplyConnection",
});

export const JobCommentReplyInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    comment: { type: GraphQLString },
    user: { type: GraphQLString },
    job: { type: GraphQLString },
    parent: {type: GraphQLString},
  },
  name: "JobCommentReplyInput",
  description: "The updated properties for a job comment reply.",
});

export const JobCommentReplyArguments = {
  _id: { type: GraphQLString },
};
