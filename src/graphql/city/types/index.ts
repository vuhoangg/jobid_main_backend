import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import {PageInfo} from "../../types";

export const CityType = new GraphQLObjectType({
  description: "Represents a city.",
  fields: {
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    slug: {type: GraphQLString},
    focus_keyword: {type: GraphQLString},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    image: {type: GraphQLString},
    image_description: {type: GraphQLString},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
  },
  name: "City",
});

export const CityEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "CityEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CityType),
    },
  },
  name: "CityEdge",
});

export const CityConnection = new GraphQLObjectType({
  description: "List of citys.",
  fields: {
    edges: {
      description: "CityConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CityEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "CityConnection",
});

export const CityInput = new GraphQLInputObjectType({
  description: "The updated properties for a city.",
  fields: {
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    slug: {type: GraphQLString},
    focus_keyword: {type: GraphQLString},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    image: {type: GraphQLString},
    image_description: {type: GraphQLString},
  },
  name: "CityInput",
});

export const CityArguments = {
  _id: {type: GraphQLString},
  slug: {type: GraphQLString},
};
