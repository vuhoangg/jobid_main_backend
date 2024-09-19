"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobLevelQueries = {
    jobLevel: {
        args: types_2.JobLevelArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobLevel)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobLevel),
    },
    jobLevels: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobLevels)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobLevelConnection),
    }
};
exports.default = jobLevelQueries;
//# sourceMappingURL=index.js.map