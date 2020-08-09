import NotificationService from "../../../db/repositories/NotificationRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateNotification(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return NotificationService.update(input);
    }
  }
}
export function updateReadNotification(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    let loggedUser = context.user;
    input = Object.assign(input, {target: loggedUser._id});
    return NotificationService.readNotification(input).then(r => ({status: true}));
  }
}

export function updateReadAllNotification(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = {target: loggedUser._id};
    return NotificationService.readAllNotification(input).then(r => ({status: true}));
  }
}
