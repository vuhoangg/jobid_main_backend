"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../user/types");
const types_2 = require("../../types");
const types_3 = require("../../community_post/types");
exports.CommunityPostLike = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_1.User },
        community_post: { type: types_3.CommunityPost },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CommunityPostLike",
});
exports.CommunityPostLikeEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostLikeEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CommunityPostLike),
        },
    },
    name: "CommunityPostLikeEdge",
});
exports.CommunityPostLikeConnection = new graphql_1.GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CommunityPostLikeEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "CommunityPostLikeConnection",
});
exports.CommunityPostLikeInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        community_post: { type: graphql_1.GraphQLString },
    },
    name: "CommunityPostLikeInput",
    description: "The updated properties for a benefit.",
});
exports.CommunityPostLikeArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map