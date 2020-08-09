import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getWard, getWards} from "../resolvers/get";
import {WardArguments, WardConnection, Ward} from "../types";

const wardQueries = {
  ward: {
    args: WardArguments,
    resolve: (source, args, context, info) => getWard(source, args, context, info),
    type: new GraphQLNonNull(Ward),
  },
  wards: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getWards(source, args, context, info),
    type: new GraphQLNonNull(WardConnection),
  },
};

export default wardQueries;
