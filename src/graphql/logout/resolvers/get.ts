import userService from "../../../db/repositories/UserRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const logout = async (args, context) => {
  const user = context.res.locals.fullUser;
  if (await authenticateUser(context, context.res)) {
    context.logout();
  }
  await userService.update({ _id: user._id, accessToken: "", refreshToken: "" });
  let ret = {
    status: true,
  };
  return ret;
};
