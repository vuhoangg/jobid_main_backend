"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const serviceWorkerNotificationQueries = {
    serviceWorkerNotification: {
        args: types_2.ServiceWorkerNotificationArguments,
        resolve: (source, args, context, info) => (0, get_1.getServiceWorkerNotification)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ServiceWorkerNotification),
    },
    serviceWorkerNotifications: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getServiceWorkerNotifications)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ServiceWorkerNotificationConnection),
    }
};
exports.default = serviceWorkerNotificationQueries;
//# sourceMappingURL=index.js.map