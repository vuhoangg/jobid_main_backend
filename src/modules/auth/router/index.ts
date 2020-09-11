import express from "express";

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
    const user = req.user.user;
    const accessToken = req.user.accessToken;
    user.accessToken = "";
    user.refreshToken = "";
    res.cookie("user", user, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      maxAge: parseInt(process.env.COOKIE_AGE),
      httpOnly: false,
      path: "/",
    });
    res.cookie("knv_accessToken", accessToken, {
      domain: process.env.COOKIE_SHARE_DOMAIN,
      maxAge: parseInt(process.env.COOKIE_AGE),
      httpOnly: false,
      path: "/",
    });
    res.redirect(`${process.env.SITE_URL}/auth/redirect`);
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
      user.accessToken = "";
      user.refreshToken = "";
      res.cookie("user", user, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: parseInt(process.env.COOKIE_AGE),
        httpOnly: false,
        path: "/",
      });
      res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: parseInt(process.env.COOKIE_AGE),
        httpOnly: false,
        path: "/",
      });
    }
    res.redirect(`${process.env.SITE_URL}/auth/redirect`);
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

router.get("/login", async (req, res, next) => {
  console.log("ok");
  res.end();
});

export { router as AuthRouter };
