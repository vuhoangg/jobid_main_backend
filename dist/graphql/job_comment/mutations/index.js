"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobCommentMutations = {
    jobCommentCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobCommentInput) } },
        resolve: (source, args, context, info) => update_1.createJobComment(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobComment),
    },
    jobCommentUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobCommentInput) } },
        resolve: (source, args, context, info) => update_1.updateJobComment(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobComment),
    },
};
exports.default = jobCommentMutations;
//# sourceMappingURL=index.js.map