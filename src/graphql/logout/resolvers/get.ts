export const logout = (args, context) => {
  let expired = new Date();
  expired.setDate(expired.getDate() - 30);
  context.res.cookie("user", null, {expires: expired, domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: false});
  if (context.isAuthenticated()) {
    context.logout();
  }
  let ret = {
    status: true,
  };
  return ret;
};
