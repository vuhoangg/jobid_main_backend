export const logout = (args, context) => {
  context.res.cookie("user", null, {expires: new Date(), domain: process.env.COOKIE_DOMAIN, httpOnly: false});
  if (context.isAuthenticated()) {
    context.logout();
  }
  let ret = {
    status: true,
  };
  return ret;
};
