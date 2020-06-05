import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getNotification, getNotifications} from "../resolvers/get";
import {Notification, NotificationArguments, NotificationConnection} from "../types";

const notificationQueries = {
  notification: {
    args: NotificationArguments,
    resolve: (source, args, context, info) => getNotification(source, args, context, info),
    type: new GraphQLNonNull(Notification),
  },
  notifications: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getNotifications(source, args, context, info),
    type: new GraphQLNonNull(NotificationConnection),
  }
};
export default notificationQueries;
