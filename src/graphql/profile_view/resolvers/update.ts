import ProfileViewService from "../../../db/repositories/ProfileViewRepository";

export function updateProfileView(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user_hunter: loggedUser._id});
    return ProfileViewService.profileView(input);
  }
}
