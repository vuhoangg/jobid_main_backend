import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }));
router.get("/google/callback",
    passport.authenticate("google", {failureRedirect: "/login"}),
    async (req, res) => {
        res.cookie('user', req.user, {domain: process.env.COOKIE_SHARE_DOMAIN, maxAge: parseInt(process.env.COOKIE_AGE), httpOnly: false});
        res.redirect(process.env.SITE_URL);
    });

router.get("/facebook",
    passport.authenticate("facebook", {
        scope: ["email"]
    }));
router.get("/facebook/callback",
    passport.authenticate("facebook", {failureRedirect: "/login"}),
    async (req, res) => {
        res.cookie('user', req.user, {domain: process.env.COOKIE_SHARE_DOMAIN, maxAge: parseInt(process.env.COOKIE_AGE), httpOnly: false});
        res.redirect(process.env.SITE_URL);
    });

router.get("/zalo", passport.authenticate('zalo'));
router.get("/zalo/callback",
    passport.authenticate('zalo', {failureRedirect: "/login"}),
    async (req, res) => {
        res.cookie('user', req.user, {domain: process.env.COOKIE_SHARE_DOMAIN, maxAge: parseInt(process.env.COOKIE_AGE), httpOnly: false});
        res.redirect(process.env.SITE_URL);
    });

export {
    router as AuthRouter
}