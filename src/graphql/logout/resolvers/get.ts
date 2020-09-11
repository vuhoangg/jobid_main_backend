import userService from "../../../db/repositories/UserRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const logout = async (args, context) => {
  const user = context.user;
  if (await authenticate(context, context.res)) {
    context.logout();
  }
  await userService.update({ _id: user._id, accessToken: "", refreshToken: "" });
  let ret = {
    status: true,
  };
  return ret;
};
