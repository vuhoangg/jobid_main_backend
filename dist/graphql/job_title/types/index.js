"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTitleArguments = exports.JobTitleInput = exports.JobTitleConnection = exports.JobTitleEdge = exports.JobTitle = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.JobTitle = new graphql_1.GraphQLObjectType({
    description: "Represents a job title.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobTitle",
});
exports.JobTitleEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobTitleEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobTitle),
        },
    },
    name: "JobTitleEdge",
});
exports.JobTitleConnection = new graphql_1.GraphQLObjectType({
    description: "List of job titles.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobTitleEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobTitleConnection",
});
exports.JobTitleInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "JobTitleInput",
    description: "The updated properties for a job title.",
});
exports.JobTitleArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map