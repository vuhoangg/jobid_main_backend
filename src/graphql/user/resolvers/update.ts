import UserService from "../../../db/repositories/UserRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateUser (source, args, context, info) {
    if (context.isAuthenticated()) {
      let loggedUser = context.user;
      let input = args.input;
      input = Object.assign(input, {_id: loggedUser._id});
      return UserService.update(input);
    }
}

export function markSpam(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return UserService.markSpam(input._id);
    }
  }
}

export function removeSpam(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return UserService.removeSpam(input._id);
    }
  }
}
