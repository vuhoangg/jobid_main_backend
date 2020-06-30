"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const serviceWorkerNotificationMutations = {
    serviceWorkerNotificationUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.ServiceWorkerNotificationInput) } },
        resolve: (source, args, context, info) => update_1.updateServiceWorkerNotification(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.ServiceWorkerNotification),
    },
    serviceWorkerNotificationCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.ServiceWorkerNotificationInput) } },
        resolve: (source, args, context, info) => update_1.createServiceWorkerNotification(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.ServiceWorkerNotification),
    },
};
exports.default = serviceWorkerNotificationMutations;
//# sourceMappingURL=index.js.map