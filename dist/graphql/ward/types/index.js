"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardArguments = exports.WardInput = exports.WardConnection = exports.WardEdge = exports.WardType = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../district/types");
exports.WardType = new graphql_1.GraphQLObjectType({
    description: "Represents a ward.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        district: { type: types_2.DistrictType },
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
    name: "Ward",
});
exports.WardEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "WardEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.WardType),
        },
    },
    name: "WardEdge",
});
exports.WardConnection = new graphql_1.GraphQLObjectType({
    description: "List of wards.",
    fields: {
        edges: {
            description: "WardConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.WardEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "WardConnection",
});
exports.WardInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a ward.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        district: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
    name: "WardInput",
});
exports.WardArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map