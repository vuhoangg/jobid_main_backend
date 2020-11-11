import ServiceNotification from "../../../db/repositories/ServiceNotificationRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateServiceWorkerNotification = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return ServiceNotification.update(args.input);
    }
  }
};
export const createServiceWorkerNotification = async (source, args, context, info) => {
  // if (await authenticate(context, context.res)) {
  //   let loggedUser = context.res.locals.fullUser;
  //   if (isSuperUser(loggedUser.email)) {
  return ServiceNotification.create(args.input);
  //   }
  // }
};
