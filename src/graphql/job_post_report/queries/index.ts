import {GraphQLNonNull} from "graphql";
import {PaginationArguments} from "../../types";
import {getJobPostReport, getJobPostReports} from "../resolvers/get";
import {JobPostReport, JobPostReportArguments, JobPostReportConnection} from "../types";

const jobPostReportQueries = {
  jobPostReport: {
    args: JobPostReportArguments,
    resolve: (source, args, context, info) => getJobPostReport(source, args, context, info),
    type: new GraphQLNonNull(JobPostReport),
  },
  jobPostReports: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getJobPostReports(source, args, context, info),
    type: new GraphQLNonNull(JobPostReportConnection),
  }
};
export default jobPostReportQueries;
