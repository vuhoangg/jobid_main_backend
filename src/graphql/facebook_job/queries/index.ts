import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getFacebookJob, getFacebookJobs} from "../resolvers/get";
import {FacebookJob, FacebookJobArguments, FacebookJobConnection} from "../types";

const facebookJobQueries = {
  facebookJob: {
    args: FacebookJobArguments,
    resolve: (source, args, context, info) => getFacebookJob(source, args, context, info),
    type: new GraphQLNonNull(FacebookJob),
  },
  facebookJobs: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getFacebookJobs(source, args, context, info),
    type: new GraphQLNonNull(FacebookJobConnection),
  },
};

export default facebookJobQueries;
