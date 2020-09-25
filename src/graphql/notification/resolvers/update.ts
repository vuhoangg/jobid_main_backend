import NotificationService from "../../../db/repositories/NotificationRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateNotification = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return NotificationService.update(input);
    }
  }
};
export const updateReadNotification = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    let loggedUser = context.res.locals.fullUser;
    input = Object.assign(input, { target: loggedUser._id });
    return NotificationService.readNotification(input).then((r) => ({ status: true }));
  }
};

export const updateReadAllNotification = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = { target: loggedUser._id };
    return NotificationService.readAllNotification(input).then((r) => ({ status: true }));
  }
};
