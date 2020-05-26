import UserService from "../../../db/repositories/UserRepository";

export function updateUser (source, args, context, info) {
    if (context.isAuthenticated()) {
      let loggedInUser = context.user;
      let input = args.input;
      input = Object.assign(input, {_id: loggedInUser._id});
      return UserService.update(input);
    }
}
