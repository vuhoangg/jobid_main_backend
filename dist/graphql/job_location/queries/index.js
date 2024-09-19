"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobLocationQueries = {
    jobLocation: {
        args: types_2.JobLocationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobLocation)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobLocation),
    },
    jobLocations: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobLocations)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobLocationConnection),
    }
};
exports.default = jobLocationQueries;
//# sourceMappingURL=index.js.map