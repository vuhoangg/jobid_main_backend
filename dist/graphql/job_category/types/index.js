"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.JobCategory = new graphql_1.GraphQLObjectType({
    description: "Represents a job category.",
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
    name: "JobCategory",
});
exports.JobCategoryEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobCategoryEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobCategory),
        },
    },
    name: "JobCategoryEdge",
});
exports.JobCategoryConnection = new graphql_1.GraphQLObjectType({
    description: "List of job categories.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobCategoryEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobCategoryConnection",
});
exports.JobCategoryInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "JobCategoryInput",
    description: "The updated properties for a job category.",
});
exports.JobCategoryArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map