import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getJobSave, getJobSaves} from "../resolvers/get";
import {JobSave, JobSaveArguments, JobSaveConnection} from "../types";

const jobSaveQueries = {
  jobSave: {
    args: JobSaveArguments,
    resolve: (source, args, context, info) => getJobSave(source, args, context, info),
    type: new GraphQLNonNull(JobSave),
  },
  jobSaves: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobSaves(source, args, context, info),
    type: new GraphQLNonNull(JobSaveConnection),
  }
};
export default jobSaveQueries;
