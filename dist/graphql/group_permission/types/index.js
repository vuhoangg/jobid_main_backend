"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.ActionInput = new graphql_1.GraphQLInputObjectType({
    description: "Represents a action.",
    fields: {
        read: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
        create: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
        update: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
        delete: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
    },
    name: "ActionInput",
});
exports.Action = new graphql_1.GraphQLObjectType({
    description: "Represents a action.",
    fields: {
        read: { type: graphql_1.GraphQLBoolean },
        create: { type: graphql_1.GraphQLBoolean },
        update: { type: graphql_1.GraphQLBoolean },
        delete: { type: graphql_1.GraphQLBoolean },
    },
    name: "Action",
});
exports.PermissionInput = new graphql_1.GraphQLInputObjectType({
    description: "Represents a permission.",
    fields: {
        resource: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        actions: { type: new graphql_1.GraphQLNonNull(exports.ActionInput) },
    },
    name: "PermissionInput",
});
exports.Permission = new graphql_1.GraphQLObjectType({
    description: "Represents a permission.",
    fields: {
        resource: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        actions: { type: exports.Action },
    },
    name: "Permission",
});
exports.GroupPermission = new graphql_1.GraphQLObjectType({
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        company: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        permission: { type: new graphql_1.GraphQLList(exports.Permission) },
    },
    name: "GroupPermission",
    description: "Represents a group permission.",
});
exports.GroupPermissionInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        company: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        permission: { type: new graphql_1.GraphQLList(exports.PermissionInput) },
    },
    name: "GroupPermissionInput",
    description: "The updated properties for a group permisstion.",
});
exports.GroupPermissionEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of GroupPermissionEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.GroupPermission),
        },
    },
    name: "GroupPermissionEdge",
});
exports.GroupPermissionConnection = new graphql_1.GraphQLObjectType({
    description: "List of permission.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.GroupPermissionEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "GroupPermissionConnection",
});
exports.GroupPermissionArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map