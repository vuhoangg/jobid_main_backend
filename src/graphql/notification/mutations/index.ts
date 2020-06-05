import {GraphQLNonNull} from "graphql";
import {Notification, NotificationInput} from "../types";
import {updateNotification} from "../resolvers/update";

const notificationMutations = {
  notificationUpdate: {
    args: {input: {type: GraphQLNonNull(NotificationInput)}},
    resolve: (source, args, context, info) => updateNotification(source, args, context, info),
    type: new GraphQLNonNull(Notification),
  },
};
export default notificationMutations;
