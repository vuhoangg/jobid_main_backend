import {DistrictInput, DistrictType} from "../types";

import {GraphQLNonNull} from "graphql";
import {updateDistrict} from "../resolvers/update";

const districtMutations = {
  district: {
    args: {input: {type: GraphQLNonNull(DistrictInput)}},
    resolve: (source, args, context) => updateDistrict(args, context),
    type: new GraphQLNonNull(DistrictType),
  },
};

export default districtMutations;
