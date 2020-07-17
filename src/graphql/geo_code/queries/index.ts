import {GraphQLNonNull} from "graphql";
import {getDistanceBound} from "../resolvers/get";
import {DistanceBoundArgument, DistanceBoundType} from "../types";

const distanceBoundQueries = {
  distanceBound: {
    args: DistanceBoundArgument,
    resolve: (source, args, context, info) => getDistanceBound(source, args, context, info),
    type: new GraphQLNonNull(DistanceBoundType),
  },
};

export default distanceBoundQueries;
