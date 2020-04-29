import {GraphQLNonNull} from "graphql";
import {JobSave, JobSaveInput} from "../types";
import {updateJobSave} from "../resolvers/update";

const jobSaveMutations = {
  jobSaveUpdate: {
    args: {input: {type: GraphQLNonNull(JobSaveInput)}},
    resolve: (source, args, context, info) => updateJobSave(source, args, context, info),
    type: new GraphQLNonNull(JobSave),
  },
};
export default jobSaveMutations;
