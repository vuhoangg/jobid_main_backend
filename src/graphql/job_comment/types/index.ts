import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";

export const JobCommentReply = new GraphQLObjectType({
  description: "Represents a job comment reply.",
  fields: {
    user: { type: User },
    comment: {type: GraphQLString},
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobCommentReply",
});

export const JobCommentReplyInput = new GraphQLInputObjectType({
  description: "Represents a job comment reply Input.",
  fields: {
    user: { type: GraphQLString },
    comment: {type: GraphQLString},
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobCommentReply",
});


export const JobComment = new GraphQLObjectType({
  description: "Represents a job comment.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    comment: { type: GraphQLString },
    user: { type: User },
    job: { type: JobPost },
    comment_reply: {type: new GraphQLList(JobCommentReply)},
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobComment",
});
export const JobCommentEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobCommentEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobComment),
    },
  },
  name: "JobCommentEdge",
});
export const JobCommentConnection = new GraphQLObjectType({
  description: "List of job comments.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobCommentEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobCommentConnection",
});

export const JobCommentInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    comment: { type: GraphQLString },
    user: { type: GraphQLString },
    job: { type: GraphQLString },
    comment_reply: { type: new GraphQLList(GraphQLString) },
  },
  name: "JobCommentInput",
  description: "The updated properties for a job comment.",
});

export const JobCommentArguments = {
  _id: { type: GraphQLString },
};
