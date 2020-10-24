import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";

export const JobApply = new GraphQLObjectType({
  description: "Represents a job apply.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    job_post: { type: JobPost },
    user: { type: User },
    status: { type: GraphQLString },
    email: { type: GraphQLString },
    file: { type: GraphQLString },
    description: { type: GraphQLString },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "JobApply",
});
export const JobApplyEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobApplyEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobApply),
    },
  },
  name: "JobApplyEdge",
});
export const JobApplyConnection = new GraphQLObjectType({
  description: "List of job applys.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobApplyEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobApplyConnection",
});

export const JobApplyInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    status: { type: GraphQLString },
    job_post: { type: GraphQLString },
    email: { type: GraphQLString },
    file: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  name: "JobApplyInput",
  description: "The updated properties for a job apply.",
});

export const JobApplyArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
