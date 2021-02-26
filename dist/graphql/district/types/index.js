"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../city/types");
exports.District = new graphql_1.GraphQLObjectType({
    description: "Represents a district.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        city: { type: types_2.City },
        name: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        slug: { type: graphql_1.GraphQLString },
        focus_keyword: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        image_description: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "District",
});
exports.DistrictEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "DistrictEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.District),
        },
    },
    name: "DistrictEdge",
});
exports.DistrictConnection = new graphql_1.GraphQLObjectType({
    description: "List of districts.",
    fields: {
        edges: {
            description: "DistrictConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.DistrictEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "DistrictConnection",
});
exports.DistrictInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a district.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        city: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        slug: { type: graphql_1.GraphQLString },
        focus_keyword: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        image_description: { type: graphql_1.GraphQLString },
    },
    name: "DistrictInput",
});
exports.DistrictArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map