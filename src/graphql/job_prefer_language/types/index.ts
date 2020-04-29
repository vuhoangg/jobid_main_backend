import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobPreferLanguage = new GraphQLObjectType({
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
  name: "JobPreferLanguage",
});
export const JobPreferLanguageEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobPreferLanguageEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobPreferLanguage),
    },
  },
  name: "JobPreferLanguageEdge",
});
export const JobPreferLanguageConnection = new GraphQLObjectType({
  description: "List of job categories.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobPreferLanguageEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobPreferLanguageConnection",
});

export const JobPreferLanguageInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    vi_title: {type: new GraphQLNonNull(GraphQLString)},
    en_title: {type: new GraphQLNonNull(GraphQLString)},
    vi_slug: {type: new GraphQLNonNull(GraphQLString)},
    en_slug: {type: new GraphQLNonNull(GraphQLString)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
  },
  name: "JobPreferLanguageInput",
  description: "The updated properties for a job category.",
});

export const JobPreferLanguageArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
