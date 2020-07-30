import {GraphQLNonNull} from "graphql";
import {Notification, NotificationInput, NotificationRead} from "../types";
import {updateNotification, updateReadAllNotification, updateReadNotification} from "../resolvers/update";

const notificationMutations = {
  notificationUpdate: {
    args: {input: {type: GraphQLNonNull(NotificationInput)}},
    resolve: (source, args, context, info) => updateNotification(source, args, context, info),
    type: new GraphQLNonNull(Notification),
  },
  notificationRead: {
    args: {input: {type: GraphQLNonNull(NotificationInput)}},
    resolve: (source, args, context, info) => updateReadNotification(source, args, context, info),
    type: new GraphQLNonNull(NotificationRead),
  },
  notificationReadAll: {
    args: {},
    resolve: (source, args, context, info) => updateReadAllNotification(source, args, context, info),
    type: new GraphQLNonNull(NotificationRead),
  },
};
export default notificationMutations;
