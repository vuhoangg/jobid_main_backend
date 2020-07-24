import {WardInput, WardType} from "../types";

import {GraphQLNonNull} from "graphql";
import {updateWard} from "../resolvers/update";

const wardMutations = {
  ward: {
    args: {input: {type: GraphQLNonNull(WardInput)}},
    resolve: (source, args, context) => updateWard(args, context),
    type: new GraphQLNonNull(WardType),
  },
};

export default wardMutations;
