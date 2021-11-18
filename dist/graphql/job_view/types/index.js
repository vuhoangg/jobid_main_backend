"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobViewArguments = exports.JobViewInput = exports.JobViewConnection = exports.JobViewEdge = exports.JobView = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobView = new graphql_1.GraphQLObjectType({
    description: "Represents a job view.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: types_3.JobPost },
        user: { type: types_2.User },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobView",
});
exports.JobViewEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobViewEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobView),
        },
    },
    name: "JobViewEdge",
});
exports.JobViewConnection = new graphql_1.GraphQLObjectType({
    description: "List of job views.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobViewEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobViewConnection",
});
exports.JobViewInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        job_post: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobViewInput",
    description: "The updated properties for a job view.",
});
exports.JobViewArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map