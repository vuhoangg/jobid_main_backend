import jwt from "jsonwebtoken";

import userService from "../db/repositories/UserRepository";
import { use } from "passport";

export const authenticate = async (req, res) => {
  const accessToken = req.cookies.knv_accessToken;
  if (!accessToken) {
    res.clearCookie("knv_accessToken", { path: "/" });
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
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
        data: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      {
        data: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_REFRESH_TOKEN }
    );
    await userService.refreshToken(user._id, accessToken, refreshToken);

    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.DOMAIN_CLIENT_COOKIE,
      expires: new Date(Date.now() + parseInt(process.env.EXPIRES_COOKIE)),
      httpOnly: false,
      path: "/",
    });
    return true;
  } catch (err) {
    res.clearCookie("knv_accessToken", { path: "/" });
    return false;
  }
};
