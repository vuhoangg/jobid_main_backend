"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../user/types");
const types_2 = require("../../types");
const types_3 = require("../../community_category/types");
const types_4 = require("../../community_tag/types");
exports.CommunityPost = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_1.User },
        title: { type: graphql_1.GraphQLString },
        thumbnail: { type: graphql_1.GraphQLString },
        community_category: { type: types_3.CommunityCategory },
        slug: { type: graphql_1.GraphQLString },
        community_tag: { type: new graphql_1.GraphQLList(types_4.CommunityTag) },
        description: { type: graphql_1.GraphQLString },
        like_count: { type: graphql_1.GraphQLInt },
        is_like: { type: graphql_1.GraphQLBoolean },
        view_count: { type: graphql_1.GraphQLInt },
        answer_count: { type: graphql_1.GraphQLInt },
        status: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CommunityPost",
});
exports.CommunityPostEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CommunityPost),
        },
    },
    name: "CommunityPostEdge",
});
exports.CommunityPostConnection = new graphql_1.GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CommunityPostEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "CommunityPostConnection",
});
exports.CommunityPostInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        community_category: { type: graphql_1.GraphQLString },
        community_tag: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        description: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        slug: { type: graphql_1.GraphQLString },
        thumbnail: { type: graphql_1.GraphQLString },
    },
    name: "CommunityPostInput",
    description: "The updated properties for a benefit.",
});
exports.CommunityPostTrackingBySlug = new graphql_1.GraphQLObjectType({
    fields: {
        status: { type: graphql_1.GraphQLBoolean },
    },
    name: "CommunityPostTrackingBySlug",
    description: "Represents a community post tracking"
});
exports.CommunityPostTrackingBySlugInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        slug: { type: graphql_1.GraphQLString },
    },
    name: "CommunityPostTrackingBySlugInput",
    description: "The updated properties for a community post tracking."
});
exports.CommunityPostArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map