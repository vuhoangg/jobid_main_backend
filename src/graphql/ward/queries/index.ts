import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getWard, getWards} from "../resolvers/get";
import {WardArguments, WardConnection, WardType} from "../types";

const wardQueries = {
  ward: {
    args: WardArguments,
    resolve: (source, args, context, info) => getWard(source, args, context, info),
    type: new GraphQLNonNull(WardType),
  },
  wards: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getWards(source, args, context, info),
    type: new GraphQLNonNull(WardConnection),
  },
};

export default wardQueries;
