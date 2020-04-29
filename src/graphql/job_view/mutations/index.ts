import {GraphQLNonNull} from "graphql";
import {JobView, JobViewInput} from "../types";
import {updateJobView} from "../resolvers/update";

const jobViewMutations = {
  jobViewUpdate: {
    args: {input: {type: GraphQLNonNull(JobViewInput)}},
    resolve: (source, args, context, info) => updateJobView(source, args, context, info),
    type: new GraphQLNonNull(JobView),
  },
};
export default jobViewMutations;
