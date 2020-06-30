"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceWorkerNotificationArguments = exports.ServiceWorkerNotificationInput = exports.ServiceWorkerNotificationConnection = exports.ServiceWorkerNotificationEdge = exports.ServiceWorkerNotification = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.ServiceWorkerNotification = new graphql_1.GraphQLObjectType({
    description: "Represents a ServiceWorkerNotification.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        text: { type: graphql_1.GraphQLString },
        href: { type: graphql_1.GraphQLString },
        tag: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "ServiceWorkerNotification",
});
exports.ServiceWorkerNotificationEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of ServiceWorkerNotificationEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.ServiceWorkerNotification),
        },
    },
    name: "ServiceWorkerNotificationEdge",
});
exports.ServiceWorkerNotificationConnection = new graphql_1.GraphQLObjectType({
    description: "List of ServiceWorkerNotificationConnections.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.ServiceWorkerNotificationEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "ServiceWorkerNotificationConnection",
});
exports.ServiceWorkerNotificationInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        text: { type: graphql_1.GraphQLString },
        href: { type: graphql_1.GraphQLString },
        tag: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
    },
    name: "ServiceWorkerNotificationInput",
    description: "The updated properties for a ServiceWorkerNotificationInput.",
});
exports.ServiceWorkerNotificationArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map