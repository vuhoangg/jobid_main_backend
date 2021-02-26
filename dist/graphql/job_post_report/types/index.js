"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../job_post/types");
const types_2 = require("../../types");
const types_3 = require("../../user/types");
exports.JobPostReport = new graphql_1.GraphQLObjectType({
    description: "Represents a job post report.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: types_3.User },
        job_post: { type: types_1.JobPost },
        reason: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "JobPostReport"
});
exports.JobPostReportEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobPostReportEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobPostReport),
        },
    },
    name: "JobPostReportEdge"
});
exports.JobPostReportConnection = new graphql_1.GraphQLObjectType({
    description: "List of job posts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobPostReportEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "JobPostReportConnection",
});
exports.JobPostReportInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        job_post: { type: graphql_1.GraphQLString },
        reason: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for a job post report",
    name: "JobPostReportInput"
});
exports.JobPostReportArguments = {
    _id: { type: graphql_1.GraphQLString },
    job_post: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map