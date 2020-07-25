import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import {PageInfo} from "../../types";
import {CityType} from "../../city/types";

export const DistrictType = new GraphQLObjectType({
  description: "Represents a district.",
  fields: {
    _id: {type: GraphQLString},
    city: {type: CityType},
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
  name: "District",
});

export const DistrictEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "DistrictEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(DistrictType),
    },
  },
  name: "DistrictEdge",
});

export const DistrictConnection = new GraphQLObjectType({
  description: "List of districts.",
  fields: {
    edges: {
      description: "DistrictConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(DistrictEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "DistrictConnection",
});

export const DistrictInput = new GraphQLInputObjectType({
  description: "The updated properties for a district.",
  fields: {
    _id: {type: GraphQLString},
    city: {type: new GraphQLNonNull(GraphQLString)},
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
  name: "DistrictInput",
});

export const DistrictArguments = {
  _id: {type: GraphQLString},
  slug: {type: GraphQLString},
};
