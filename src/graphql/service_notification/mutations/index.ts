import {GraphQLNonNull} from "graphql";
import {ServiceWorkerNotification, ServiceWorkerNotificationInput} from "../types";
import {createServiceWorkerNotification, updateServiceWorkerNotification} from "../resolvers/update";

const serviceWorkerNotificationMutations = {
    serviceWorkerNotificationUpdate: {
        args: {input: {type: GraphQLNonNull(ServiceWorkerNotificationInput)}},
        resolve: (source, args, context, info) => updateServiceWorkerNotification(source, args, context, info),
        type: new GraphQLNonNull(ServiceWorkerNotification),
    },
    serviceWorkerNotificationCreate: {
        args: {input: {type: GraphQLNonNull(ServiceWorkerNotificationInput)}},
        resolve: (source, args, context, info) => createServiceWorkerNotification(source, args, context, info),
        type: new GraphQLNonNull(ServiceWorkerNotification),
    },
};
export default serviceWorkerNotificationMutations;