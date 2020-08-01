import {CityInput, City} from "../types";

import {GraphQLNonNull} from "graphql";
import {updateCity} from "../resolvers/update";

const cityMutations = {
  city: {
    args: {input: {type: GraphQLNonNull(CityInput)}},
    resolve: (source, args, context) => updateCity(args, context),
    type: new GraphQLNonNull(City),
  },
};

export default cityMutations;
