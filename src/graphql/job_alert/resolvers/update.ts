import JobAlertService from "../../../db/repositories/JobAlertRepository";

export function updateJobAlert(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobAlertService.update(input);
  }
}
