"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.NotificationTarget = new graphql_1.GraphQLObjectType({
    description: "Represents a notification target.",
    fields: {
        object_type: { type: graphql_1.GraphQLString },
        ref: { type: graphql_1.GraphQLString },
    },
    name: "NotificationTarget"
});
exports.NotificationTargetInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a notification.",
    fields: {
        object_type: { type: graphql_1.GraphQLString },
        ref: { type: graphql_1.GraphQLString },
    },
    name: "NotificationTargetInput"
});
exports.Notification = new graphql_1.GraphQLObjectType({
    description: "Represents a notification",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        subject: { type: graphql_1.GraphQLString },
        target: { type: exports.NotificationTarget },
        message: { type: graphql_1.GraphQLString },
        href: { type: graphql_1.GraphQLString },
        read: { type: graphql_1.GraphQLBoolean },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "Notification"
});
exports.NotificationEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of NotificationEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Notification),
        },
    },
    name: "NotificationEdge",
});
exports.NotificationConnection = new graphql_1.GraphQLObjectType({
    description: "List of notifications.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.NotificationEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "NotificationConnection",
});
exports.NotificationInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        subject: { type: graphql_1.GraphQLString },
        target: { type: exports.NotificationTargetInput },
        message: { type: graphql_1.GraphQLString },
        href: { type: graphql_1.GraphQLString },
        read: { type: graphql_1.GraphQLBoolean },
    },
    name: "NotificationInput",
    description: "The updated properties for a notification.",
});
exports.NotificationArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.NotificationRead = new graphql_1.GraphQLObjectType({
    fields: {
        status: { type: graphql_1.GraphQLBoolean },
    },
    name: "NotificationRead",
    description: "Represents a notification read status.",
});
//# sourceMappingURL=index.js.map