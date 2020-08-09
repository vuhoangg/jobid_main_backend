"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobReplyCommentQueries = {
    jobReplyComment: {
        args: types_2.JobCommentReplyArguments,
        resolve: (source, args, context, info) => get_1.getJobReplyComment(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobCommentReply),
    },
    jobReplyComments: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobReplyComments(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobCommentReplyConnection),
    }
};
exports.default = jobReplyCommentQueries;
//# sourceMappingURL=index.js.map