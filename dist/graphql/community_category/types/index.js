"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityCategoryArguments = exports.CommunityCategoryInput = exports.CommunityCategoryConnection = exports.CommunityCategoryEdge = exports.CommunityCategory = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.CommunityCategory = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CommunityCategory",
});
exports.CommunityCategoryEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CommunityCategoryEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CommunityCategory),
        },
    },
    name: "CommunityCategoryEdge",
});
exports.CommunityCategoryConnection = new graphql_1.GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CommunityCategoryEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CommunityCategoryConnection",
});
exports.CommunityCategoryInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        slug: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "CommunityCategoryInput",
    description: "The updated properties for a benefit.",
});
exports.CommunityCategoryArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map