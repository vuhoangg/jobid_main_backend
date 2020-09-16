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
exports.handleRefreshToken = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../db/repositories/UserRepository"));
exports.authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.knv_accessToken;
    if (!accessToken) {
        res.clearCookie("knv_accessToken", { path: "/" });
        return false;
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
            res.locals.user = decoded.data._id;
            return true;
        }
        catch (err) {
            if (err.name === "JsonWebTokenError") {
                res.clearCookie("knv_accessToken", { path: "/" });
                return false;
            }
            else if (err.name === "TokenExpiredError") {
                const user = yield UserRepository_1.default.findUserRefreshToken(accessToken);
                return exports.handleRefreshToken(res, user);
            }
        }
    }
});
exports.handleRefreshToken = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(user.refreshToken, process.env.JWT_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "" }),
        }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_ACCESS_TOKEN });
        const refreshToken = jsonwebtoken_1.default.sign({
            data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "" }),
        }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_REFRESH_TOKEN });
        yield UserRepository_1.default.refreshToken(user._id, accessToken, refreshToken);
        res.cookie("knv_accessToken", accessToken, {
            domain: process.env.COOKIE_SHARE_DOMAIN,
            httpOnly: false,
        });
        res.locals.user = decoded.data._id;
        return true;
    }
    catch (err) {
        res.clearCookie("knv_accessToken", { path: "/" });
        return false;
    }
});
//# sourceMappingURL=authenticate.js.map