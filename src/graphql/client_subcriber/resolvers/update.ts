import ClientSubscriberService from "../../../db/repositories/ClientSubcriberRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateClientSubcriber = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return ClientSubscriberService.update(args.input);
    }
  }
};
export const createClientSubcriber = async (source, args, context, info) => {
  // if (await authenticate(context, context.res)) {
  //   let loggedUser = context.res.locals.fullUser;
  //   if (isSuperUser(loggedUser.email)) {
  return ClientSubscriberService.create(args.input);
  //   }
  // }
};
