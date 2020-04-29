import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobAlert, getJobAlerts} from "../resolvers/get";
import {JobAlert, JobAlertArguments, JobAlertConnection} from "../types";

const jobAlertQueries = {
  jobAlert: {
    args: JobAlertArguments,
    resolve: (source, args, context, info) => getJobAlert(source, args, context, info),
    type: new GraphQLNonNull(JobAlert),
  },
  jobAlerts: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobAlerts(source, args, context, info),
    type: new GraphQLNonNull(JobAlertConnection),
  }
};
export default jobAlertQueries;
