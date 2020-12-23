import {GraphQLNonNull} from "graphql";
import {JobPostReport, JobPostReportInput} from "../types";
import {createJobPostReport, deleteJobPostReport} from "../resolvers/update";

const jobPostReportMutations = {
  jobPostReportCreate: {
    args: {input: {type: GraphQLNonNull(JobPostReportInput)}},
    resolve: (source, args, context, info) => createJobPostReport(source, args, context, info),
    type: new GraphQLNonNull(JobPostReport),
  },
  jobPostReportDelete: {
    args: {input: {type: GraphQLNonNull(JobPostReportInput)}},
    resolve: (source, args, context, info) => deleteJobPostReport(source, args, context, info),
    type: new GraphQLNonNull(JobPostReport),
  },
};
export default jobPostReportMutations;
