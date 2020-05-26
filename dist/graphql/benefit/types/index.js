"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitArguments = exports.BenefitInput = exports.BenefitConnection = exports.BenefitEdge = exports.Benefit = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.Benefit = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        icon: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "Benefit",
});
exports.BenefitEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of BenefitEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Benefit),
        },
    },
    name: "BenefitEdge",
});
exports.BenefitConnection = new graphql_1.GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.BenefitEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "BenefitConnection",
});
exports.BenefitInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        vi_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        icon: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "BenefitInput",
    description: "The updated properties for a benefit.",
});
exports.BenefitArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map