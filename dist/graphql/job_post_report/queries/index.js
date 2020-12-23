"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobPostReportQueries = {
    jobPostReport: {
        args: types_2.JobPostReportArguments,
        resolve: (source, args, context, info) => get_1.getJobPostReport(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPostReport),
    },
    jobPostReports: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobPostReports(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPostReportConnection),
    }
};
exports.default = jobPostReportQueries;
//# sourceMappingURL=index.js.map