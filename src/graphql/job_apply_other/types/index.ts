import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";

export const JobApplyOther = new GraphQLObjectType({
  description: "Represents a job apply other.",
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
  name: "JobApplyOther",
});
export const JobApplyOtherEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobApplyOtherEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobApplyOther),
    },
  },
  name: "JobApplyOtherEdge",
});
export const JobApplyOtherConnection = new GraphQLObjectType({
  description: "List of job applys other.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobApplyOtherEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobApplyOtherConnection",
});

export const JobApplyOtherInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    status: { type: GraphQLString },
    job_post: { type: GraphQLString },
    email: { type: GraphQLString },
    file: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  name: "JobApplyOtherInput",
  description: "The updated properties for a job apply other.",
});

export const JobApplyOtherArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
