import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";

export const JobApplyOrther = new GraphQLObjectType({
  description: "Represents a job apply orther.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    job_post: { type: GraphQLNonNull(GraphQLString) },
    user: { type: User },
    status: { type: GraphQLString },
    email: { type: GraphQLString },
    file: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "JobApplyOrther",
});
export const JobApplyOrtherEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobApplyOrtherEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobApplyOrther),
    },
  },
  name: "JobApplyOrtherEdge",
});
export const JobApplyOrtherConnection = new GraphQLObjectType({
  description: "List of job applys orther.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobApplyOrtherEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobApplyOrtherConnection",
});

export const JobApplyOrtherInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    status: { type: GraphQLString },
    job_post: { type: GraphQLString },
    email: { type: GraphQLString },
    file: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  name: "JobApplyOrtherInput",
  description: "The updated properties for a job apply orther.",
});

export const JobApplyOrtherArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
