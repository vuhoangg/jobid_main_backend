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
exports.handleRefreshTokenEmployer = exports.authenticateEmployer = exports.handleRefreshTokenUser = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../db/repositories/UserRepository"));
const EmployerRepository_1 = __importDefault(require("../db/repositories/EmployerRepository"));
exports.authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.knv_accessToken;
    if (!accessToken) {
        res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.USER_JWT_SECRET);
            res.locals.user = decoded.data._id;
            res.locals.fullUser = decoded.data;
            return true;
        }
        catch (err) {
            if (err.name === "JsonWebTokenError") {
                res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
                return false;
            }
            else if (err.name === "TokenExpiredError") {
                const user = yield UserRepository_1.default.findUserRefreshToken(accessToken);
                return exports.handleRefreshTokenUser(res, user);
            }
        }
    }
});
exports.handleRefreshTokenUser = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(user.refreshToken, process.env.USER_JWT_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
        }, process.env.USER_JWT_SECRET, { expiresIn: process.env.USER_EXPIRES_ACCESS_TOKEN });
        const refreshToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
        }, process.env.USER_JWT_SECRET, { expiresIn: process.env.USER_EXPIRES_REFRESH_TOKEN });
        yield UserRepository_1.default.refreshToken(user._id, accessToken, refreshToken);
        res.cookie("knv_accessToken", accessToken, {
            domain: process.env.COOKIE_SHARE_DOMAIN,
            httpOnly: true,
            path: "/",
            maxAge: Number(process.env.USER_EXPIRES_ACCESS_TOKEN),
        });
        res.locals.user = decoded.data._id;
        res.locals.fullUser = decoded.data;
        return true;
    }
    catch (err) {
        res.clearCookie("knv_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
    }
});
exports.authenticateEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.employer_accessToken;
    if (!accessToken) {
        res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.EMPLOYER_JWT_SECRET);
            res.locals.employer = decoded.data._id;
            res.locals.fullEmployer = decoded.data;
            return true;
        }
        catch (err) {
            if (err.name === "JsonWebTokenError") {
                res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
                return false;
            }
            else if (err.name === "TokenExpiredError") {
                const employer = yield EmployerRepository_1.default.findEmployerRefreshToken(accessToken);
                return exports.handleRefreshTokenEmployer(res, employer);
            }
        }
    }
});
exports.handleRefreshTokenEmployer = (res, employer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(employer.refreshToken, process.env.EMPLOYER_JWT_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, employer.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
        }, process.env.EMPLOYER_JWT_SECRET, { expiresIn: process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN });
        const refreshToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, employer.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
        }, process.env.EMPLOYER_JWT_SECRET, { expiresIn: process.env.EMPLOYER_EXPIRES_REFRESH_TOKEN });
        yield EmployerRepository_1.default.refreshToken(employer._id, accessToken, refreshToken);
        res.cookie("employer_accessToken", accessToken, {
            domain: process.env.COOKIE_SHARE_DOMAIN,
            httpOnly: true,
            path: "/",
            maxAge: Number(process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN),
        });
        res.locals.employer = decoded.data._id;
        res.locals.fullEmployer = decoded.data;
        return true;
    }
    catch (err) {
        res.clearCookie("employer_accessToken", { path: "/", domain: process.env.COOKIE_SHARE_DOMAIN, httpOnly: true });
        return false;
    }
});
//# sourceMappingURL=authenticate.js.map