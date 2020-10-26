"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyArguments = exports.JobApplyInput = exports.JobApplyConnection = exports.JobApplyEdge = exports.JobApply = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.JobApply = new graphql_1.GraphQLObjectType({
    description: "Represents a job apply.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: types_3.JobPost },
        user: { type: types_2.User },
        status: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        file: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobApply",
});
exports.JobApplyEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobApplyEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobApply),
        },
    },
    name: "JobApplyEdge",
});
exports.JobApplyConnection = new graphql_1.GraphQLObjectType({
    description: "List of job applys.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobApplyEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobApplyConnection",
});
exports.JobApplyInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        job_post: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        file: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "JobApplyInput",
    description: "The updated properties for a job apply.",
});
exports.JobApplyArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map