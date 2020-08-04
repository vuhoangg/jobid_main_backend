"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateArguments = exports.CandidateInput = exports.CandidateConnection = exports.CandidateEdge = exports.Candidate = exports.CandidateFileInput = exports.CandidateFile = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.CandidateFile = new graphql_1.GraphQLObjectType({
    name: "CandidateFile",
    fields: {
        name: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
    },
    description: "Represents a candidate file.",
});
exports.CandidateFileInput = new graphql_1.GraphQLInputObjectType({
    name: "CandidateFileInput",
    fields: {
        name: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for a candidate file.",
});
exports.Candidate = new graphql_1.GraphQLObjectType({
    description: "Represents a candidate.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        interest: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_open: { type: graphql_1.GraphQLBoolean },
        user: { type: types_2.User },
        cv: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        files: { type: new graphql_1.GraphQLList(exports.CandidateFile) },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "Candidate",
});
exports.CandidateEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CandidateEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Candidate),
        },
    },
    name: "CandidateEdge",
});
exports.CandidateConnection = new graphql_1.GraphQLObjectType({
    description: "List of candidates.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CandidateEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CandidateConnection",
});
exports.CandidateInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        interest: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_open: { type: graphql_1.GraphQLBoolean },
        user: { type: graphql_1.GraphQLString },
        cv: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        files: { type: new graphql_1.GraphQLList(exports.CandidateFileInput) },
    },
    name: "CandidateInput",
    description: "The updated properties for a candidate.",
});
exports.CandidateArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map