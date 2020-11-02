import express from "express";
import jwt from "jsonwebtoken";
import userService from "../../../db/repositories/UserRepository";
import { authenticate } from "../../../middlewares/authenticate";
import { handleTokenAuth } from "../handles";

const router = express.Router();
import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req: any, res) => {
    const accessToken = req.user.accessToken;
    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      httpOnly: false,
      path: "/",
    });
    res.redirect(`${process.env.SITE_URL}`);
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
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

router.get("/zalo", passport.authenticate("zalo"));
router.get("/zalo/callback", passport.authenticate("zalo", { failureRedirect: "/login" }), async (req, res) => {
  res.cookie("user", req.user, {
    domain: process.env.COOKIE_SHARE_DOMAIN,
    maxAge: parseInt(process.env.COOKIE_AGE),
    httpOnly: false,
  });
  res.redirect(process.env.SITE_URL);
});

router.post(
  "/login",
  (req, res, next) => {
    if (!req.cookies.knv_accessToken) {
      res.status(200).json({});
    } else {
      next();
    }
  },
  async (req, res) => {
    if (await authenticate(req, res)) {
      const user_id = res.locals.user;
      const user = await userService.getById(user_id);
      res.json({ user });
    } else {
      res.json({});
    }
  }
);

router.post("/logout", async (req, res) => {
  if (await authenticate(req, res)) {
    const user_id = res.locals.user;
    await userService.logout(user_id);
    res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: false });
    res.status(200).json("ok");
  }
});

router.post("/refresh-token", async (req, res) => {
  const user = await userService.findUserRefreshToken(req.body.accessToken);
  if (user) {
    const accessToken = await handleTokenAuth(user);
    res.json({ user_id: user.user_chiase, accessToken });
  } else {
    res.end();
  }
});

export { router as AuthRouter };
