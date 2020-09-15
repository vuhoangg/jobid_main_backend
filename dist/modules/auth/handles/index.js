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
exports.handleTokenAuth = exports.saveNewFacebookUser = exports.saveNewGoogleUser = exports.isExistingEmailUser = exports.isExistingIdUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const mail_1 = require("../../../mail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.isExistingIdUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return UserRepository_1.default.getBy({ _id }, { email: 1, first_name: 1, last_name: 1, full_name: 1, avatar: 1, user_chiase: 1 });
});
function isExistingEmailUser(email) {
    return UserRepository_1.default.getBy({ email }, { email: 1, first_name: 1, last_name: 1, full_name: 1, avatar: 1, user_chiase: 1 });
}
exports.isExistingEmailUser = isExistingEmailUser;
exports.saveNewGoogleUser = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        full_name: `${profile.name.familyName.trim()} ${profile.name.givenName.trim()}`,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        login_type: "google",
        user_chiase: mongoose_1.default.Types.ObjectId(),
    };
    mail_1.sendWelcome(payload.email);
    return UserRepository_1.default.create(payload);
});
exports.saveNewFacebookUser = (profile) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        full_name: `${profile.name.familyName.trim()} ${profile.name.givenName.trim()}`,
        avatar: profile.photos[0].value,
        // facebook_link: profile.profileUrl,
        // gender: profile.gender,
        email: profile.emails[0].value,
        login_type: "facebook",
        user_chiaser: mongoose_1.default.Types.ObjectId(),
    };
    mail_1.sendWelcome(profile.emails[0].value);
    return UserRepository_1.default.create(payload);
};
exports.handleTokenAuth = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({
        data: user,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_ACCESS_TOKEN });
    const refreshToken = jsonwebtoken_1.default.sign({
        data: user,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_REFRESH_TOKEN });
    yield UserRepository_1.default.update({
        _id: user._id,
        accessToken,
        refreshToken,
    });
    return accessToken;
});
//# sourceMappingURL=index.js.map