"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.JobRating = new graphql_1.GraphQLObjectType({
    description: "Represents a job rating reply.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_2.User },
        job: { type: graphql_1.GraphQLString },
        rat_value: { type: graphql_1.GraphQLInt },
        rat_comment: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "JobRating",
});
exports.JobRatingEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobRatingEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobRating),
        },
    },
    name: "JobRatingEdge",
});
exports.JobRatingConnection = new graphql_1.GraphQLObjectType({
    description: "List of job ratings.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobRatingEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobRatingConnection",
});
exports.JobRatingInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        job: { type: graphql_1.GraphQLString },
        rat_value: { type: graphql_1.GraphQLInt },
        rat_comment: { type: graphql_1.GraphQLString },
    },
    name: "JobRatingInput",
    description: "The updated properties for a job rating input.",
});
exports.JobRatingArguments = {
    _id: { type: graphql_1.GraphQLString },
    job_post: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map