"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSaveArguments = exports.JobSaveInput = exports.JobSaveConnection = exports.JobSaveEdge = exports.JobSave = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobSave = new graphql_1.GraphQLObjectType({
    description: "Represents a job save.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: types_3.JobPost },
        user: { type: types_2.User },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobSave",
});
exports.JobSaveEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobSaveEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobSave),
        },
    },
    name: "JobSaveEdge",
});
exports.JobSaveConnection = new graphql_1.GraphQLObjectType({
    description: "List of job saves.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobSaveEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobSaveConnection",
});
exports.JobSaveInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        job_post: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobSaveInput",
    description: "The updated properties for a job save.",
});
exports.JobSaveArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map