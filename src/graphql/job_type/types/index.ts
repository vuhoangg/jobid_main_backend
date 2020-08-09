import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobType = new GraphQLObjectType({
  description: "Represents a job type.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobType",
});
export const JobTypeEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobTypeEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobType),
    },
  },
  name: "JobTypeEdge",
});
export const JobTypeConnection = new GraphQLObjectType({
  description: "List of job types.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobTypeEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobTypeConnection",
});

export const JobTypeInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    title: {type: new GraphQLNonNull(GraphQLString)},
    slug: {type: GraphQLString},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
  },
  name: "JobTypeInput",
  description: "The updated properties for a job type.",
});

export const JobTypeArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
