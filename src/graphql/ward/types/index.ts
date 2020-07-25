import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import {PageInfo} from "../../types";
import {DistrictType} from "../../district/types";

export const WardType = new GraphQLObjectType({
  description: "Represents a ward.",
  fields: {
    _id: {type: GraphQLString},
    district: {type: DistrictType},
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
  name: "Ward",
});

export const WardEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "WardEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(WardType),
    },
  },
  name: "WardEdge",
});

export const WardConnection = new GraphQLObjectType({
  description: "List of wards.",
  fields: {
    edges: {
      description: "WardConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(WardEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "WardConnection",
});

export const WardInput = new GraphQLInputObjectType({
  description: "The updated properties for a ward.",
  fields: {
    _id: {type: GraphQLString},
    district: {type: new GraphQLNonNull(GraphQLString)},
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
  name: "WardInput",
});

export const WardArguments = {
  _id: {type: GraphQLString},
  slug: {type: GraphQLString},
};
