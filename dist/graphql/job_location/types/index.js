"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobLocationArguments = exports.JobLocationInput = exports.JobLocationConnection = exports.JobLocationEdge = exports.JobLocation = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.JobLocation = new graphql_1.GraphQLObjectType({
    description: "Represents a job location.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobLocation",
});
exports.JobLocationEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobLocationEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobLocation),
        },
    },
    name: "JobLocationEdge",
});
exports.JobLocationConnection = new graphql_1.GraphQLObjectType({
    description: "List of job categories.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobLocationEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobLocationConnection",
});
exports.JobLocationInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "JobLocationInput",
    description: "The updated properties for a job location.",
});
exports.JobLocationArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map