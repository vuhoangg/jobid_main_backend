import {GraphQLNonNull} from "graphql";
import {JobAlert, JobAlertInput} from "../types";
import {updateJobAlert} from "../resolvers/update";

const jobAlertMutations = {
  jobAlertUpdate: {
    args: {input: {type: GraphQLNonNull(JobAlertInput)}},
    resolve: (source, args, context, info) => updateJobAlert(source, args, context, info),
    type: new GraphQLNonNull(JobAlert),
  },
};
export default jobAlertMutations;
