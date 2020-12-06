import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { PageInfo } from "../../types";
import { City } from "../../city/types";
import { Employer } from "../../employer/types";

export const CvWarehouse = new GraphQLObjectType({
  description: "Represents a cv warehouse.",
  fields: {
    _id: { type: GraphQLString },
    employer: { type: Employer },
    thumnail: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    access: { type: GraphQLString },
    status: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "CvWarehouse",
});

export const CvWarehouseEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "CvWarehouseEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CvWarehouse),
    },
  },
  name: "CvWarehouseEdge",
});

export const CvWarehouseConnection = new GraphQLObjectType({
  description: "List of cv warehouses.",
  fields: {
    edges: {
      description: "CvWarehouseConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CvWarehouseEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "CvWarehouseConnection",
});

export const CvWarehouseInput = new GraphQLInputObjectType({
  description: "The updated properties for a cv warehouse.",
  fields: {
    _id: { type: GraphQLString },
    employer: { type: GraphQLString },
    thumnail: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    access: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  name: "CvWarehouseInput",
});

export const CvWarehouseArguments = {
  _id: { type: GraphQLString },
};
