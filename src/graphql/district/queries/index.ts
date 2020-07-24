import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getDistrict, getDistricts} from "../resolvers/get";
import {DistrictArguments, DistrictConnection, DistrictType} from "../types";

const districtQueries = {
  district: {
    args: DistrictArguments,
    resolve: (source, args, context, info) => getDistrict(source, args, context, info),
    type: new GraphQLNonNull(DistrictType),
  },
  districts: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getDistricts(source, args, context, info),
    type: new GraphQLNonNull(DistrictConnection),
  },
};

export default districtQueries;
