import express from "express";
import jwt from "jsonwebtoken";
import UserService from "../../../db/repositories/UserRepository";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";
import { handleTokenAuthEmployer, handleTokenAuthUser } from "../handles";

import passport from "passport";
import EmployerService from "../../../db/repositories/EmployerRepository";
const router = express.Router();

router.get(
  "/user/google",
  passport.authenticate("google_user", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/employer/google",
  passport.authenticate("google_employer", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/user/google/callback",
  passport.authenticate("google_user", { failureRedirect: "/user/login" }),
  async (req: any, res) => {
    const accessToken = req.user.user.accessToken;

    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
      maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
    });
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get(
  "/employer/google/callback",
  passport.authenticate("google_employer", { failureRedirect: "/employer/login" }),
  async (req: any, res) => {

    const accessToken = req.user.employer.accessToken;

    res.cookie("employer_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
      maxAge: Number(process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN),
    });
    res.redirect(`${process.env.STUDIO_URL}`);
  }
);

router.get("/user/facebook", passport.authenticate("facebook_user", { scope: ["email"] }));
router.get(
  "/user/facebook/callback",
  passport.authenticate("facebook_user", { failureRedirect: "/user/login" }),
  async (req: any, res) => {
    const user = req.user.user;
    if (user._id) {
      const accessToken = req.user.accessToken;
      res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        httpOnly: true,
        path: "/",
        maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
      });
    }
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get("/user/zalo", passport.authenticate("zalo"));
router.get("/user/zalo/callback", passport.authenticate("zalo", { failureRedirect: "/user/login" }), async (req, res) => {
  res.cookie("knv_accessToken", req.user, {
    domain: process.env.COOKIE_SHARE_DOMAIN,
    maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
    httpOnly: true,
  });
  res.redirect(process.env.SITE_URL);
});

router.post(
  "/user/login",
  (req, res, next) => {
    if (!req.cookies.knv_accessToken) {
      res.status(200).json({});
    } else {
      next();
    }
  },
  async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
      const user_id = res.locals.user;
      const user = await UserService.getById(user_id);
      res.json({ user });
    } else {
      res.json({});
    }
  }
);

router.post(
  "/employer/login",
  (req, res, next) => {
    if (!req.cookies.employer_accessToken) {
      res.status(200).json({});
    } else {
      next();
    }
  },
  async (req, res) => {
    let isAuthenticated = await authenticateEmployer(req, res);
    if (isAuthenticated) {
      const employer_id = res.locals.employer;
      const employer = await EmployerService.getById(employer_id);
      res.json({ employer });
    } else {
      res.json({});
    }
  }
);

router.post("/user/logout", async (req, res) => {
  let isAuthenticated = await authenticateUser(req, res);
  if (isAuthenticated) {
    const user_id = res.locals.user;
    await UserService.logout(user_id);
    res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    res.status(200).json("ok");
  }
});

router.post("/employer/logout", async (req, res) => {
  let isAuthenticated = await authenticateEmployer(req, res);
  if (isAuthenticated) {
    const employer_id = res.locals.employer;
    await EmployerService.logout(employer_id);
    res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
    res.status(200).json("ok");
  }
});

router.post("/user/refresh-token", async (req, res) => {
  const user = await UserService.findUserRefreshToken(req.body.accessToken);
  if (user) {
    const accessToken = await handleTokenAuthUser(user);
    res.json({ user_id: user.user_chiase, accessToken });
  } else {
    res.end();
  }
});

router.post("/employer/refresh-token", async (req, res) => {
  const employer = await EmployerService.findEmployerRefreshToken(req.body.accessToken);
  if (employer) {
    const accessToken = await handleTokenAuthEmployer(employer);
    res.json({ accessToken });
  } else {
    res.end();
  }
});




export { router as AuthRouter };
