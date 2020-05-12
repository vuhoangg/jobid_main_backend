import JobSaveService from "../../../db/repositories/JobSaveRepository";

export function updateJobSave(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return JobSaveService.saveJob(input);
  }
}
