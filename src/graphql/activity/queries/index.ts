import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getActivitys} from "../resolvers/get";
import {ActivityConnection} from "../types";

const activityQueries = {
  activitys: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getActivitys(source, args, context, info),
    type: new GraphQLNonNull(ActivityConnection),
  }
};
export default activityQueries;
