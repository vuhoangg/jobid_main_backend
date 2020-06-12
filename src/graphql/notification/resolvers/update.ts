import NotificationService from "../../../db/repositories/NotificationRepository";

export function updateNotification(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    return NotificationService.get(input._id, {}).then(r1 => {
      if (r1.target.ref == loggedUser._id) {
        input = Object.assign(input, {user: loggedUser._id});
        return NotificationService.readNotification(input);
      } else {
        return r1;
      }
    });

  }
}
