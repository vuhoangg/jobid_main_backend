import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobCategory = new GraphQLObjectType({
  description: "Represents a job category.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    vi_title: {type: new GraphQLNonNull(GraphQLString)},
    en_title: {type: new GraphQLNonNull(GraphQLString)},
    vi_slug: {type: new GraphQLNonNull(GraphQLString)},
    en_slug: {type: new GraphQLNonNull(GraphQLString)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobCategory",
});
export const JobCategoryEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobCategoryEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobCategory),
    },
  },
  name: "JobCategoryEdge",
});
export const JobCategoryConnection = new GraphQLObjectType({
  description: "List of job categories.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobCategoryEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobCategoryConnection",
});

export const JobCategoryInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    vi_title: {type: new GraphQLNonNull(GraphQLString)},
    en_title: {type: new GraphQLNonNull(GraphQLString)},
    vi_slug: {type: new GraphQLNonNull(GraphQLString)},
    en_slug: {type: new GraphQLNonNull(GraphQLString)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
  },
  name: "JobCategoryInput",
  description: "The updated properties for a job category.",
});

export const JobCategoryArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
