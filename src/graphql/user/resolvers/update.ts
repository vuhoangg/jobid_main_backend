import UserService from "../../../db/repositories/UserRepository";

export function updateUser (source, args, context, info) {
    if (context.isAuthenticated()) {
      let loggedUser = context.user;
      let input = args.input;
      input = Object.assign(input, {_id: loggedUser._id});
      return UserService.update(input);
    }
}
