"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobAlertArguments = exports.JobAlertInput = exports.JobAlertConnection = exports.JobAlertEdge = exports.JobAlert = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobAlert = new graphql_1.GraphQLObjectType({
    description: "Represents a job alert.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: types_3.JobPost },
        user: { type: types_2.User },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobAlert",
});
exports.JobAlertEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobAlertEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobAlert),
        },
    },
    name: "JobAlertEdge",
});
exports.JobAlertConnection = new graphql_1.GraphQLObjectType({
    description: "List of job alerts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobAlertEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobAlertConnection",
});
exports.JobAlertInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        job_post: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobAlertInput",
    description: "The updated properties for a job alert.",
});
exports.JobAlertArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map