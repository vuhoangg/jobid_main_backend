import ServiceNotification from "../../../db/repositories/ServiceNotificationRepository";
import { isSuperUser } from "../../../helpers/permission";

export function updateServiceWorkerNotification(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return ServiceNotification.update(args.input);
    }
  }
}
export function createServiceWorkerNotification(source, args, context, info) {
  // if (context.isAuthenticated()) {
  //   let loggedUser = context.user;
  //   if (isSuperUser(loggedUser.email)) {
      return ServiceNotification.create(args.input);
  //   }
  // }
}
