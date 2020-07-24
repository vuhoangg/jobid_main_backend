"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityArguments = exports.CityInput = exports.CityConnection = exports.CityEdge = exports.CityType = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.CityType = new graphql_1.GraphQLObjectType({
    description: "Represents a city.",
    fields: {
        id: { type: graphql_1.GraphQLString },
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
    name: "City",
});
exports.CityEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "CityEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CityType),
        },
    },
    name: "CityEdge",
});
exports.CityConnection = new graphql_1.GraphQLObjectType({
    description: "List of citys.",
    fields: {
        edges: {
            description: "CityConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CityEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CityConnection",
});
exports.CityInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a city.",
    fields: {
        id: { type: graphql_1.GraphQLString },
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
    name: "CityInput",
});
exports.CityArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map