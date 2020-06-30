import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getServiceWorkerNotification, getServiceWorkerNotifications} from "../resolvers/get";
import {ServiceWorkerNotification, ServiceWorkerNotificationArguments, ServiceWorkerNotificationConnection} from "../types";

const serviceWorkerNotificationQueries = {
    serviceWorkerNotification: {
        args: ServiceWorkerNotificationArguments,
        resolve: (source, args, context, info) => getServiceWorkerNotification(source, args, context, info),
        type: new GraphQLNonNull(ServiceWorkerNotification),
    },
    serviceWorkerNotifications: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getServiceWorkerNotifications(source, args, context, info),
        type: new GraphQLNonNull(ServiceWorkerNotificationConnection),
    }
};
export default serviceWorkerNotificationQueries;