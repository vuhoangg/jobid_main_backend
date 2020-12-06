"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerArguments = exports.EmployerInput = exports.EmployerConnection = exports.EmployerEdge = exports.Employer = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.Employer = new graphql_1.GraphQLObjectType({
    name: "Employer",
    description: "Represents an employer.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: graphql_1.GraphQLString },
        psid: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
});
exports.EmployerEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of EmployerEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Employer),
        },
    },
    name: "EmployerEdge",
});
exports.EmployerConnection = new graphql_1.GraphQLObjectType({
    description: "List of employers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.EmployerEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "EmployerConnection",
});
exports.EmployerInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        psid: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
    },
    name: "EmployerInput",
    description: "The updated properties for an employer.",
});
exports.EmployerArguments = {
    _id: { type: graphql_1.GraphQLString },
    email: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map