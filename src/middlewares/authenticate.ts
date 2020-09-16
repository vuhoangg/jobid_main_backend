import jwt from "jsonwebtoken";

import userService from "../db/repositories/UserRepository";

export const authenticate = async (req, res) => {
  const accessToken = req.cookies.knv_accessToken;
  if (!accessToken) {
    res.clearCookie("knv_accessToken", { path: "/" });
    return false;
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      res.locals.user = decoded.data._id;
      return true;
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.clearCookie("knv_accessToken", { path: "/" });
        return false;
      } else if (err.name === "TokenExpiredError") {
        const user = await userService.findUserRefreshToken(accessToken);
        return handleRefreshToken(res, user);
      }
    }
  }
};

export const handleRefreshToken = async (res: any, user: any) => {
  try {
    const decoded = jwt.verify(user.refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      {
        data: { ...user.toObject(), accessToken: "", refreshToken: "" },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      {
        data: { ...user.toObject(), accessToken: "", refreshToken: "" },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_REFRESH_TOKEN }
    );
    await userService.refreshToken(user._id, accessToken, refreshToken);

    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: false,
    });
    res.locals.user = decoded.data._id;
    return true;
  } catch (err) {
    res.clearCookie("knv_accessToken", { path: "/" });
    return false;
  }
};
