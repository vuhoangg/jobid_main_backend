"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobReplyommentMutations = {
    jobReplyCommentCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobCommentReplyInput) } },
        resolve: (source, args, context, info) => (0, update_1.createJobReplyComment)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobCommentReply),
    },
    jobReplyCommentUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobCommentReplyInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateJobReplyComment)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobCommentReply),
    },
};
exports.default = jobReplyommentMutations;
//# sourceMappingURL=index.js.map