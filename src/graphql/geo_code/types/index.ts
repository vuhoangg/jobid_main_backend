import {GraphQLFloat, GraphQLNonNull, GraphQLObjectType} from "graphql";

export const DistanceBoundType = new GraphQLObjectType({
  description: "DistanceBound specific resource",
  fields: {
    minLat: {type: GraphQLFloat},
    maxLat: {type: GraphQLFloat},
    minLng: {type: GraphQLFloat},
    maxLng: {type: GraphQLFloat},
  },
  name: "DistanceBoundType",
});

export const DistanceBoundArgument = {
  lat: {type: new GraphQLNonNull(GraphQLFloat)},
  lng: {type: new GraphQLNonNull(GraphQLFloat)},
  range: {type: new GraphQLNonNull(GraphQLFloat)},
};
