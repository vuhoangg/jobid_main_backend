import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobView, getJobViews} from "../resolvers/get";
import {JobView, JobViewArguments, JobViewConnection} from "../types";

const jobViewQueries = {
  jobView: {
    args: JobViewArguments,
    resolve: (source, args, context, info) => getJobView(source, args, context, info),
    type: new GraphQLNonNull(JobView),
  },
  jobViews: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobViews(source, args, context, info),
    type: new GraphQLNonNull(JobViewConnection),
  }
};
export default jobViewQueries;
