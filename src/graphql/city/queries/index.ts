import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getCity, getCitys} from "../resolvers/get";
import {CityArguments, CityConnection, CityType} from "../types";

const cityQueries = {
  city: {
    args: CityArguments,
    resolve: (source, args, context, info) => getCity(source, args, context, info),
    type: new GraphQLNonNull(CityType),
  },
  citys: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCitys(source, args, context, info),
    type: new GraphQLNonNull(CityConnection),
  },
};

export default cityQueries;
