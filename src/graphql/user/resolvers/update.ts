import UserService from "../../../db/repositories/UserRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateUser = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (input && input.customize_info && input.customize_info.first_name && input.customize_info.last_name) {
      input.customize_info.full_name = `${input.customize_info.first_name.trim()} ${input.customize_info.last_name.trim()}`;
    }
    input = Object.assign(input, { _id: loggedUser._id });
    return UserService.update(input);
  }
};

export const markSpam = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return UserService.markSpam(input._id);
    }
  }
};

export const removeSpam = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return UserService.removeSpam(input._id);
    }
  }
};
