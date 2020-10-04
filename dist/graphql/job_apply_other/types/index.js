"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyOtherArguments = exports.JobApplyOtherInput = exports.JobApplyOtherConnection = exports.JobApplyOtherEdge = exports.JobApplyOther = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.JobApplyOther = new graphql_1.GraphQLObjectType({
    description: "Represents a job apply other.",
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
    name: "JobApplyOther",
});
exports.JobApplyOtherEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobApplyOtherEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobApplyOther),
        },
    },
    name: "JobApplyOtherEdge",
});
exports.JobApplyOtherConnection = new graphql_1.GraphQLObjectType({
    description: "List of job applys other.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobApplyOtherEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobApplyOtherConnection",
});
exports.JobApplyOtherInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        job_post: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        file: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
    },
    name: "JobApplyOtherInput",
    description: "The updated properties for a job apply other.",
});
exports.JobApplyOtherArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map