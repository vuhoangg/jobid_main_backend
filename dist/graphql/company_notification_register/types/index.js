"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyNotificationRegisterArguments = exports.CompanyNotificationRegisterInput = exports.CompanyNotificationRegisterConnection = exports.CompanyNotificationRegisterEdge = exports.CompanyNotificationRegister = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../company/types");
exports.CompanyNotificationRegister = new graphql_1.GraphQLObjectType({
    description: "Represents a company notification register.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        company: { type: types_3.Company },
        user: { type: types_2.User },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyNotificationRegister",
});
exports.CompanyNotificationRegisterEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CompanyNotificationRegisterEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CompanyNotificationRegister),
        },
    },
    name: "CompanyNotificationRegisterEdge",
});
exports.CompanyNotificationRegisterConnection = new graphql_1.GraphQLObjectType({
    description: "List of company notification registers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CompanyNotificationRegisterEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CompanyNotificationRegisterConnection",
});
exports.CompanyNotificationRegisterInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        company: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyNotificationRegisterInput",
    description: "The updated properties for a company notification register.",
});
exports.CompanyNotificationRegisterArguments = {
    _id: { type: graphql_1.GraphQLString },
    company: { type: graphql_1.GraphQLString }
};
//# sourceMappingURL=index.js.map