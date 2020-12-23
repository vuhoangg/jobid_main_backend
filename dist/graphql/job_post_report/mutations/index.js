"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobPostReportMutations = {
    jobPostReportCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostReportInput) } },
        resolve: (source, args, context, info) => update_1.createJobPostReport(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPostReport),
    },
    jobPostReportDelete: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostReportInput) } },
        resolve: (source, args, context, info) => update_1.deleteJobPostReport(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPostReport),
    },
};
exports.default = jobPostReportMutations;
//# sourceMappingURL=index.js.map