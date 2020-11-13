"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerArguments = exports.BannerInput = exports.BannerConnection = exports.BannerEdge = exports.Banner = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.Banner = new graphql_1.GraphQLObjectType({
    description: "Represents a banner.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        src: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        status: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "Banner",
});
exports.BannerEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of BannerEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Banner),
        },
    },
    name: "BannerEdge",
});
exports.BannerConnection = new graphql_1.GraphQLObjectType({
    description: "List of banners.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.BannerEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "BannerConnection",
});
exports.BannerInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        src: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "BannerInput",
    description: "The updated properties for a banner.",
});
exports.BannerArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map