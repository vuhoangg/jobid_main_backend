import {FacebookJobInput, FacebookJob} from "../types";

import {GraphQLNonNull} from "graphql";
import {updateFacebookJob} from "../resolvers/update";

const facebookJobMutations = {
  facebookJob: {
    args: {input: {type: GraphQLNonNull(FacebookJobInput)}},
    resolve: (source, args, context) => updateFacebookJob(args, context),
    type: new GraphQLNonNull(FacebookJob),
  },
};

export default facebookJobMutations;
