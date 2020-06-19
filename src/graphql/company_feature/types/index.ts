import {GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {PageInfo} from "../../types";

export const CompanyFeature = new GraphQLObjectType({
  description: "Represents a company follow.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "CompanyFeature",
});

export const CompanyFeatureEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of CompanyFeatureEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CompanyFeature),
    },
  },
  name: "CompanyFeatureEdge",
});

export const CompanyFeatureConnection = new GraphQLObjectType({
  description: "List of company feature.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CompanyFeatureEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "CompanyFeatureConnection",
});

export const CompanyFeatureArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};

export const CompanyFeatureInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    name: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "CompanyFeatureInput",
  description: "The updated properties for a company feature.",
});
