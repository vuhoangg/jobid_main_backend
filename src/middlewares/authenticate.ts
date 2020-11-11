import jwt from "jsonwebtoken";

import UserService from "../db/repositories/UserRepository";
import EmployerService from "../db/repositories/EmployerRepository";

export const authenticateUser = async (req, res) => {
  const accessToken = req.cookies.knv_accessToken;
  if (!accessToken) {
    res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    return false;
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.USER_JWT_SECRET);
      res.locals.user = decoded.data._id;
      res.locals.fullUser = decoded.data;
      return true;
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
      } else if (err.name === "TokenExpiredError") {
        const user = await UserService.findUserRefreshToken(accessToken);
        return handleRefreshTokenUser(res, user);
      }
    }
  }
};

export const handleRefreshTokenUser = async (res: any, user: any) => {
  try {
    const decoded = jwt.verify(user.refreshToken, process.env.USER_JWT_SECRET);
    const accessToken = jwt.sign(
      {
        data: {
          ...user.toObject(),
          accessToken: "",
          refreshToken: "",
          info: {},
          company_role: [],
          manager_cv: [],
          customize_info: {},
        },
      },
      process.env.USER_JWT_SECRET,
      { expiresIn: process.env.USER_EXPIRES_ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      {
        data: {
          ...user.toObject(),
          accessToken: "",
          refreshToken: "",
          info: {},
          company_role: [],
          manager_cv: [],
          customize_info: {},
        },
      },
      process.env.USER_JWT_SECRET,
      { expiresIn: process.env.USER_EXPIRES_REFRESH_TOKEN }
    );
    await UserService.refreshToken(user._id, accessToken, refreshToken);

    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
    });
    res.locals.user = decoded.data._id;
    res.locals.fullUser = decoded.data;
    return true;
  } catch (err) {
    res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    return false;
  }
};

export const authenticateEmployer = async (req, res) => {
  const accessToken = req.cookies.employer_accessToken;
  if (!accessToken) {
    res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    return false;
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.EMPLOYER_JWT_SECRET);
      res.locals.employer = decoded.data._id;
      res.locals.fullEmployer = decoded.data;
      return true;
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
      } else if (err.name === "TokenExpiredError") {
        const employer = await EmployerService.findEmployerRefreshToken(accessToken);
        return handleRefreshTokenEmployer(res, employer);
      }
    }
  }
};

export const handleRefreshTokenEmployer = async (res: any, employer: any) => {
  try {
    const decoded = jwt.verify(employer.refreshToken, process.env.EMPLOYER_JWT_SECRET);
    const accessToken = jwt.sign(
      {
        data: {
          ...employer.toObject(),
          accessToken: "",
          refreshToken: "",
          info: {},
          company_role: [],
          manager_cv: [],
          customize_info: {},
        },
      },
      process.env.EMPLOYER_JWT_SECRET,
      { expiresIn: process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      {
        data: {
          ...employer.toObject(),
          accessToken: "",
          refreshToken: "",
          info: {},
          company_role: [],
          manager_cv: [],
          customize_info: {},
        },
      },
      process.env.EMPLOYER_JWT_SECRET,
      { expiresIn: process.env.EMPLOYER_EXPIRES_REFRESH_TOKEN }
    );
    await EmployerService.refreshToken(employer._id, accessToken, refreshToken);

    res.cookie("employer_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
    });
    res.locals.employer = decoded.data._id;
    res.locals.fullEmployer = decoded.data;
    return true;
  } catch (err) {
    res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    return false;
  }
};
