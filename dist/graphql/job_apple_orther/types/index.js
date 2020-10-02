"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyOrtherArguments = exports.JobApplyOrtherInput = exports.JobApplyOrtherConnection = exports.JobApplyOrtherEdge = exports.JobApplyOrther = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.JobApplyOrther = new graphql_1.GraphQLObjectType({
    description: "Represents a job apply orther.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_2.User },
        status: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        file: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobApplyOrther",
});
exports.JobApplyOrtherEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobApplyOrtherEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobApplyOrther),
        },
    },
    name: "JobApplyOrtherEdge",
});
exports.JobApplyOrtherConnection = new graphql_1.GraphQLObjectType({
    description: "List of job applys orther.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobApplyOrtherEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobApplyOrtherConnection",
});
exports.JobApplyOrtherInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        job_post: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        file: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
    },
    name: "JobApplyOrtherInput",
    description: "The updated properties for a job apply orther.",
});
exports.JobApplyOrtherArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map