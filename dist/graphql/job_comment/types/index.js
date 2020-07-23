"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCommentArguments = exports.JobCommentInput = exports.JobCommentConnection = exports.JobCommentEdge = exports.JobComment = exports.JobCommentReplyInput = exports.JobCommentReply = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobCommentReply = new graphql_1.GraphQLObjectType({
    description: "Represents a job comment reply.",
    fields: {
        user: { type: types_2.User },
        comment: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "JobCommentReply",
});
exports.JobCommentReplyInput = new graphql_1.GraphQLInputObjectType({
    description: "Represents a job comment reply Input.",
    fields: {
        user: { type: graphql_1.GraphQLString },
        comment: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "JobCommentReply",
});
exports.JobComment = new graphql_1.GraphQLObjectType({
    description: "Represents a job comment.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        comment: { type: graphql_1.GraphQLString },
        user: { type: types_2.User },
        job: { type: types_3.JobPost },
        comment_reply: { type: new graphql_1.GraphQLList(exports.JobCommentReply) },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "JobComment",
});
exports.JobCommentEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobCommentEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobComment),
        },
    },
    name: "JobCommentEdge",
});
exports.JobCommentConnection = new graphql_1.GraphQLObjectType({
    description: "List of job comments.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobCommentEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobCommentConnection",
});
exports.JobCommentInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        comment: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        job: { type: graphql_1.GraphQLString },
        comment_reply: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    name: "JobCommentInput",
    description: "The updated properties for a job comment.",
});
exports.JobCommentArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map