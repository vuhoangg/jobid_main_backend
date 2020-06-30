import ClientSubscriberService from "../../../db/repositories/ClientSubcriberRepository";
import { isSuperUser } from "../../../helpers/permission";

export function updateClientSubcriber(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return ClientSubscriberService.update(args.input);
    }
  }
}
export function createClientSubcriber(source, args, context, info) {
  // if (context.isAuthenticated()) {
  //   let loggedUser = context.user;
  //   if (isSuperUser(loggedUser.email)) {
      return ClientSubscriberService.create(args.input);
  //   }
  // }
}
