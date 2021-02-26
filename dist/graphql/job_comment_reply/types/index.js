"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
const types_4 = require("../../job_comment/types");
exports.JobCommentReply = new graphql_1.GraphQLObjectType({
    description: "Represents a job comment reply.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        comment: { type: graphql_1.GraphQLString },
        user: { type: types_2.User },
        job: { type: types_3.JobPost },
        parent: { type: types_4.JobComment },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "JobCommentReply",
});
exports.JobCommentReplyEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobCommentReplyEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobCommentReply),
        },
    },
    name: "JobCommentReplyEdge",
});
exports.JobCommentReplyConnection = new graphql_1.GraphQLObjectType({
    description: "List of job comments.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobCommentReplyEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobCommentReplyConnection",
});
exports.JobCommentReplyInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        comment: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        job: { type: graphql_1.GraphQLString },
        parent: { type: graphql_1.GraphQLString },
    },
    name: "JobCommentReplyInput",
    description: "The updated properties for a job comment reply.",
});
exports.JobCommentReplyArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map