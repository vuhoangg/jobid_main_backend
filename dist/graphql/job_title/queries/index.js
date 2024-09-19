"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobTitleQueries = {
    jobTitle: {
        args: types_2.JobTitleArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobTitle)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobTitle),
    },
    jobTitles: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobTitles)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobTitleConnection),
    }
};
exports.default = jobTitleQueries;
//# sourceMappingURL=index.js.map