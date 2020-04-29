import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";

export function updateCompanyFollow(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user: loggedUser._id});
    return CompanyFollowService.update(input);
  }
}
