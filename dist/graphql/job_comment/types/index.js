"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobComment = new graphql_1.GraphQLObjectType({
    description: "Represents a job comment.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        comment: { type: graphql_1.GraphQLString },
        user: { type: types_2.User },
        job: { type: types_3.JobPost },
        children: { type: graphql_1.GraphQLBoolean },
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
        children: { type: graphql_1.GraphQLBoolean },
    },
    name: "JobCommentInput",
    description: "The updated properties for a job comment.",
});
exports.JobCommentArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map