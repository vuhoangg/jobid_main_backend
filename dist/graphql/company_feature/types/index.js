"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyFeatureInput = exports.CompanyFeatureArguments = exports.CompanyFeatureConnection = exports.CompanyFeatureEdge = exports.CompanyFeature = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.CompanyFeature = new graphql_1.GraphQLObjectType({
    description: "Represents a company follow.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyFeature",
});
exports.CompanyFeatureEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CompanyFeatureEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CompanyFeature),
        },
    },
    name: "CompanyFeatureEdge",
});
exports.CompanyFeatureConnection = new graphql_1.GraphQLObjectType({
    description: "List of company feature.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CompanyFeatureEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CompanyFeatureConnection",
});
exports.CompanyFeatureArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.CompanyFeatureInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyFeatureInput",
    description: "The updated properties for a company feature.",
});
//# sourceMappingURL=index.js.map