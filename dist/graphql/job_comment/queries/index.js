"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobCommentQueries = {
    jobComment: {
        args: types_2.JobCommentArguments,
        resolve: (source, args, context, info) => get_1.getJobComment(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobComment),
    },
    jobComments: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobComments(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobCommentConnection),
    }
};
exports.default = jobCommentQueries;
//# sourceMappingURL=index.js.map