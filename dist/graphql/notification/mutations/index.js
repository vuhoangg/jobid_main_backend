"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const notificationMutations = {
    notificationUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.NotificationInput) } },
        resolve: (source, args, context, info) => update_1.updateNotification(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Notification),
    },
    notificationRead: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.NotificationInput) } },
        resolve: (source, args, context, info) => update_1.updateReadNotification(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.NotificationRead),
    },
    notificationReadAll: {
        args: {},
        resolve: (source, args, context, info) => update_1.updateReadAllNotification(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.NotificationRead),
    },
};
exports.default = notificationMutations;
//# sourceMappingURL=index.js.map