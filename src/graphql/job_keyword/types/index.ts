import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";

export const JobKeyword = new GraphQLObjectType({
  description: "Represents a job keyword.",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    keyword: { type: GraphQLString },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "JobKeyword",
});
export const JobKeywordEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobKeywordEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobKeyword),
    },
  },
  name: "JobKeywordEdge",
});
export const JobKeywordConnection = new GraphQLObjectType({
  description: "List of job keywords.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobKeywordEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobKeywordConnection",
});

export const JobKeywordInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    keyword: { type: GraphQLString },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
  },
  name: "JobKeywordInput",
  description: "The updated properties for a job keyword.",
});

export const JobKeywordArguments = {
  _id: { type: GraphQLString },
  slug: { type: GraphQLString },
};
