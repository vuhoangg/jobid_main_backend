import {GraphQLNonNull} from "graphql";
import {getCoordinatesFromLatLong, getCoordinatesFromText} from "../resolvers/get";
import {CoordinateConnection, CoordinateLatLongArgument, CoordinateTextArgument} from "../types";

const coordinateQueries = {
  coordinateText: {
    args: CoordinateTextArgument,
    resolve: (source, args, context, info) => getCoordinatesFromText(source, args, context, info),
    type: new GraphQLNonNull(CoordinateConnection),
  },
  coordinateLatLong: {
    args: CoordinateLatLongArgument,
    resolve: (source, args, context, info) => getCoordinatesFromLatLong(source, args, context, info),
    type: new GraphQLNonNull(CoordinateConnection),
  },
};

export default coordinateQueries;
