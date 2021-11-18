"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPostAnswerArguments = exports.CommunityPostAnswerInput = exports.CommunityPostAnswerConnection = exports.CommunityPostAnswerEdge = exports.CommunityPostAnswer = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../user/types");
const types_2 = require("../../types");
exports.CommunityPostAnswer = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_1.User },
        community_post: { type: graphql_1.GraphQLString },
        reply: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        like_count: { type: graphql_1.GraphQLInt },
        reply_count: { type: graphql_1.GraphQLInt },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CommunityPostAnswer",
});
exports.CommunityPostAnswerEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostAnswerEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CommunityPostAnswer),
        },
    },
    name: "CommunityPostAnswerEdge",
});
exports.CommunityPostAnswerConnection = new graphql_1.GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CommunityPostAnswerEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "CommunityPostAnswerConnection",
});
exports.CommunityPostAnswerInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        community_post: { type: graphql_1.GraphQLString },
        reply: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "CommunityPostAnswerInput",
    description: "The updated properties for a benefit.",
});
exports.CommunityPostAnswerArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map