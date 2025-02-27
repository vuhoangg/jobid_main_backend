"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobApplyQueries = {
    jobApply: {
        args: types_2.JobApplyArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobApply)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApply),
    },
    jobApplys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobApplys)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApplyConnection),
    },
    employerJobApply: {
        args: types_2.JobApplyArguments,
        resolve: (source, args, context, info) => (0, get_1.getEmployerJobApply)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApply),
    },
    employerJobApplys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getEmployerJobApplys)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApplyConnection),
    },
    adminJobApply: {
        args: types_2.JobApplyArguments,
        resolve: (source, args, context, info) => (0, get_1.getAdminJobApply)(source, args, context, info),
        type: types_2.JobApply,
    },
    adminJobApplys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getAdminJobApplys)(source, args, context, info),
        type: types_2.JobApplyConnection,
    },
};
exports.default = jobApplyQueries;
//# sourceMappingURL=index.js.map