import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";

export const JobComment = new GraphQLObjectType({
  description: "Represents a job comment.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    comment: { type: GraphQLString },
    user: { type: User },
    job: { type: JobPost },
    children: { type: GraphQLBoolean },
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
    children: { type: GraphQLBoolean },
  },
  name: "JobCommentInput",
  description: "The updated properties for a job comment.",
});

export const JobCommentArguments = {
  _id: { type: GraphQLString },
};
