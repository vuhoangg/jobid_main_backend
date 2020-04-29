import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobLevel = new GraphQLObjectType({
  description: "Represents a job level.",
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
  name: "JobLevel",
});
export const JobLevelEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobLevelEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobLevel),
    },
  },
  name: "JobLevelEdge",
});
export const JobLevelConnection = new GraphQLObjectType({
  description: "List of job levels.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobLevelEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobLevelConnection",
});

export const JobLevelInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    vi_title: {type: new GraphQLNonNull(GraphQLString)},
    en_title: {type: new GraphQLNonNull(GraphQLString)},
    vi_slug: {type: new GraphQLNonNull(GraphQLString)},
    en_slug: {type: new GraphQLNonNull(GraphQLString)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
  },
  name: "JobLevelInput",
  description: "The updated properties for a job level.",
});

export const JobLevelArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
