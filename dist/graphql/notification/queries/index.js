"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const notificationQueries = {
    notification: {
        args: types_2.NotificationArguments,
        resolve: (source, args, context, info) => (0, get_1.getNotification)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Notification),
    },
    notifications: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getNotifications)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.NotificationConnection),
    },
};
exports.default = notificationQueries;
//# sourceMappingURL=index.js.map