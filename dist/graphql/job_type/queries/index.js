"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobTypeQueries = {
    jobType: {
        args: types_2.JobTypeArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobType)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobType),
    },
    jobTypes: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobTypes)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobTypeConnection),
    }
};
exports.default = jobTypeQueries;
//# sourceMappingURL=index.js.map