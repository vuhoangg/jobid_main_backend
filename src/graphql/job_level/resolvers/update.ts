import JobLevelService from "../../../db/repositories/JobLevelRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobLevel(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobLevelService.update(args.input);
    }
  }
}

export function createJobLevel(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobLevelService.create(args.input);
    }
  }
}
