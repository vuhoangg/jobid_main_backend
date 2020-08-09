import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";

export const JobRating = new GraphQLObjectType({
  description: "Represents a job rating reply.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: User },
    job: { type: GraphQLString },
    rat_value: { type: GraphQLInt },
    rat_comment: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobRating",
});
export const JobRatingEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobRatingEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobRating),
    },
  },
  name: "JobRatingEdge",
});
export const JobRatingConnection = new GraphQLObjectType({
  description: "List of job ratings.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobRatingEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobRatingConnection",
});

export const JobRatingInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    user: { type: GraphQLString },
    job: { type: GraphQLString },
    rat_value: { type: GraphQLInt },
    rat_comment: { type: GraphQLString },
  },
  name: "JobRatingInput",
  description: "The updated properties for a job rating input.",
});

export const JobRatingArguments = {
  _id: { type: GraphQLString },
  job_post: { type: GraphQLString },
};
