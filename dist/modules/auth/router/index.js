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
const handles_1 = require("../handles");
const passport_1 = __importDefault(require("passport"));
const EmployerRepository_1 = __importDefault(require("../../../db/repositories/EmployerRepository"));
const router = express_1.default.Router();
exports.AuthRouter = router;
router.get("/user/google", passport_1.default.authenticate("google_user", {
    scope: ["profile", "email"],
}));
router.get("/employer/google", passport_1.default.authenticate("google_employer", {
    scope: ["profile", "email"],
}));
router.get("/user/google/callback", passport_1.default.authenticate("google_user", { failureRedirect: "/user/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.user.user.accessToken;
    res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        httpOnly: false,
        path: "/",
        maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
    });
    let redirect = req.cookies.pathname ? `${process.env.SITE_URL}${req.cookies.pathname}` : process.env.SITE_URL;
    res.redirect(redirect);
}));
router.get("/employer/google/callback", passport_1.default.authenticate("google_employer", { failureRedirect: "/employer/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.user.employer.accessToken;
    res.cookie("employer_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        httpOnly: false,
        path: "/",
        maxAge: Number(process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN),
    });
    res.redirect(`${process.env.STUDIO_URL}`);
}));
router.get("/user/facebook", passport_1.default.authenticate("facebook_user", { scope: ["email"] }));
router.get("/user/facebook/callback", passport_1.default.authenticate("facebook_user", { failureRedirect: "/user/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.user.user.accessToken;
    res.cookie("knv_accessToken", accessToken, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        httpOnly: false,
        path: "/",
        maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
    });
    let redirect = req.cookies.pathname ? `${process.env.SITE_URL}${req.cookies.pathname}` : process.env.SITE_URL;
    res.redirect(redirect);
}));
router.get("/user/zalo", passport_1.default.authenticate("zalo"));
router.get("/user/zalo/callback", passport_1.default.authenticate("zalo", { failureRedirect: "/user/login" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("knv_accessToken", req.user, {
        domain: process.env.COOKIE_SHARE_DOMAIN,
        maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
        httpOnly: false,
    });
    res.redirect(process.env.SITE_URL);
}));
router.post("/user/login", (req, res, next) => {
    if (!req.cookies.knv_accessToken) {
        res.status(200).json({});
    }
    else {
        next();
    }
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(req, res);
    if (isAuthenticated) {
        const user_id = res.locals.user;
        const user = yield UserRepository_1.default.getById(user_id);
        res.json({ user });
    }
    else {
        res.json({ user: null });
    }
}));
router.post("/employer/login", (req, res, next) => {
    if (!req.cookies.employer_accessToken) {
        res.status(200).json({});
    }
    else {
        next();
    }
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        const employer_id = res.locals.employer;
        const employer = yield EmployerRepository_1.default.getById(employer_id);
        res.json({ employer });
    }
    else {
        res.json({});
    }
}));
router.post("/user/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(req, res);
    if (isAuthenticated) {
        const user_id = res.locals.user;
        yield UserRepository_1.default.logout(user_id);
        res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        res.status(200).json("ok");
    }
}));
router.post("/employer/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        const employer_id = res.locals.employer;
        yield EmployerRepository_1.default.logout(employer_id);
        res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        res.status(200).json("ok");
    }
}));
router.post("/user/refresh-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.findUserRefreshToken(req.body.accessToken);
    if (user) {
        const accessToken = yield (0, handles_1.handleTokenAuthUser)(user);
        res.json({ user_id: user.user_chiase, accessToken });
    }
    else {
        res.end();
    }
}));
router.post("/employer/refresh-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employer = yield EmployerRepository_1.default.findEmployerRefreshToken(req.body.accessToken);
    if (employer) {
        const accessToken = yield (0, handles_1.handleTokenAuthEmployer)(employer);
        res.json({ accessToken });
    }
    else {
        res.end();
    }
}));
//# sourceMappingURL=index.js.map