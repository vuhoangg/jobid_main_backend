"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.JobRegister = new graphql_1.GraphQLObjectType({
    description: "Represents a job register.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contact_name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_location: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contact_phone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contact_email: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobRegister",
});
exports.JobRegisterEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobRegisterEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobRegister),
        },
    },
    name: "JobRegisterEdge",
});
exports.JobRegisterConnection = new graphql_1.GraphQLObjectType({
    description: "List of job registers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobRegisterEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobRegisterConnection",
});
exports.JobRegisterInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        contact_name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_location: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contact_phone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contact_email: { type: graphql_1.GraphQLString },
    },
    name: "JobRegisterInput",
    description: "The updated properties for a job register.",
});
exports.JobRegisterArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map