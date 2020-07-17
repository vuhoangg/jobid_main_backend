import {GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export const CoordinateType = new GraphQLObjectType({
  description: "CoordinateType",
  fields: {
    _id: {type: GraphQLString},
    latitude: {type: GraphQLFloat},
    longitude: {type: GraphQLFloat},
    text: {type: GraphQLString},
    city: {type: GraphQLString},
    district: {type: GraphQLString},
    ward: {type: GraphQLString},
    street: {type: GraphQLString},
    house_number: {type: GraphQLString},
  },
  name: "CoordinateType",
});

export const CoordinateEdge = new GraphQLObjectType({
  description: "Coordinate edge resources",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "CoordinateEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CoordinateType),
    },
  },
  name: "CoordinateEdge",
});

export const CoordinateConnection = new GraphQLObjectType({
  fields: {
    edges: {
      description: "CoordinateConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CoordinateEdge)),
    },
  },
  name: "CoordinateConnection",
});

export const CoordinateTextArgument = {
  text: {type: new GraphQLNonNull(GraphQLString)},
};

export const CoordinateLatLongArgument = {
  latitude: {type: new GraphQLNonNull(GraphQLFloat)},
  longitude: {type: new GraphQLNonNull(GraphQLFloat)},
};

