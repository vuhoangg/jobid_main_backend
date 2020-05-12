import JobViewService from "../../../db/repositories/JobViewRepository";

export function updateJobView(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobViewService.viewJob(input);
  }
}
