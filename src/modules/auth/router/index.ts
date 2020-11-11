import express from "express";
import jwt from "jsonwebtoken";
import UserService from "../../../db/repositories/UserRepository";
import { authenticateUser } from "../../../middlewares/authenticate";
import { handleTokenAuthUser } from "../handles";

const router = express.Router();
import passport from "passport";

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
    const accessToken = req.user.accessToken;
    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
    });
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get(
  "/employer/google/callback",
  passport.authenticate("google_employer", { failureRedirect: "/employer/login" }),
  async (req: any, res) => {
    const accessToken = req.user.accessToken;
    res.cookie("employer_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: true,
      path: "/",
    });
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get("/user/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
  "/user/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/user/login" }),
  async (req: any, res) => {
    const user = req.user.user;
    if (user._id) {
      const accessToken = req.user.accessToken;
      res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        httpOnly: false,
        path: "/",
      });
    }
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get("/user/zalo", passport.authenticate("zalo"));
router.get("/user/zalo/callback", passport.authenticate("zalo", { failureRedirect: "/user/login" }), async (req, res) => {
  res.cookie("user", req.user, {
    domain: process.env.COOKIE_SHARE_DOMAIN,
    maxAge: parseInt(process.env.COOKIE_AGE),
    httpOnly: false,
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
    if (await authenticateUser(req, res)) {
      const user_id = res.locals.user;
      const user = await UserService.getById(user_id);
      res.json({ user });
    } else {
      res.json({});
    }
  }
);

router.post("/user/logout", async (req, res) => {
  if (await authenticateUser(req, res)) {
    const user_id = res.locals.user;
    await UserService.logout(user_id);
    res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: false });
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




export { router as AuthRouter };
