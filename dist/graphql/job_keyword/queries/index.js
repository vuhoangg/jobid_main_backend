"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobKeywordQueries = {
    jobKeyword: {
        args: types_2.JobKeywordArguments,
        resolve: (source, args, context, info) => get_1.getJobKeyword(source, args, context, info),
        type: types_2.JobKeyword,
    },
    jobKeywords: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobKeywords(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobKeywordConnection),
    }
};
exports.default = jobKeywordQueries;
//# sourceMappingURL=index.js.map