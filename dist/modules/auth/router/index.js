"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const router = express_1.default.Router();
exports.AuthRouter = router;
const passport_1 = __importDefault(require("passport"));
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.user;
    const accessToken = req.user.accessToken;
    user.accessToken = "";
    user.refreshToken = "";
    res.cookie("user", user, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: parseInt(process.env.COOKIE_AGE),
        httpOnly: false,
    });
    res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: parseInt(process.env.COOKIE_AGE),
        httpOnly: false,
    });
    res.redirect(`${process.env.SITE_URL}/auth/redirect`);
}));
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.user;
    if (user._id) {
        const accessToken = req.user.accessToken;
        user.accessToken = "";
        user.refreshToken = "";
        res.cookie("user", user, {
            domain: process.env.COOKIE_SHARE_DOMAIN,
            maxAge: parseInt(process.env.COOKIE_AGE),
            httpOnly: false,
        });
        res.cookie("knv_accessToken", accessToken, {
            domain: process.env.COOKIE_SHARE_DOMAIN,
            maxAge: parseInt(process.env.COOKIE_AGE),
            httpOnly: false,
        });
    }
    res.redirect(`${process.env.SITE_URL}/auth/redirect`);
}));
router.get("/zalo", passport_1.default.authenticate("zalo"));
router.get("/zalo/callback", passport_1.default.authenticate("zalo", { failureRedirect: "/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("user", req.user, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: parseInt(process.env.COOKIE_AGE),
        httpOnly: false,
    });
    res.redirect(process.env.SITE_URL);
}));
router.post("/login", (req, res, next) => {
    if (!req.cookies.knv_accessToken) {
        res.status(200).json({});
    }
    else {
        next();
    }
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(req, res)) {
        const user_id = res.locals.user;
        const user = yield UserRepository_1.default.getById(user_id);
        res.json({ user });
    }
    else {
        res.json({});
    }
}));
//# sourceMappingURL=index.js.map