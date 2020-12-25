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
exports.handleTokenAuthEmployer = exports.handleTokenAuthUser = exports.saveNewFacebookUser = exports.saveNewGoogleEmployer = exports.saveNewGoogleUser = exports.isExistingEmailEmployer = exports.isExistingEmailUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const EmployerRepository_1 = __importDefault(require("../../../db/repositories/EmployerRepository"));
const mail_1 = require("../../../mail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const Employer_1 = __importDefault(require("../../../db/schemas/Employer"));
exports.isExistingEmailUser = (email) => {
    let getBy = {
        email: email,
    };
    return UserRepository_1.default.getBy(getBy, {});
};
exports.isExistingEmailEmployer = (email) => {
    let getBy = {
        email: email,
    };
    return EmployerRepository_1.default.getBy(getBy, {});
};
exports.saveNewGoogleUser = (profile) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        full_name: `${profile.name.familyName} ${profile.name.givenName}`.trim(),
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        info: {
            name: `${profile.name.familyName} ${profile.name.givenName}`.trim(),
            avatar: profile.photos[0].value,
        },
        login_type: "google",
        user_chiase: mongoose_1.default.Types.ObjectId(),
    };
    let mailData = JSON.stringify({
        "{{name}}": payload.full_name,
    });
    mail_1.sendWelcome(payload.email, payload.full_name, mailData);
    return UserRepository_1.default.create(payload);
};
exports.saveNewGoogleEmployer = (profile) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        full_name: `${profile.name.familyName} ${profile.name.givenName}`.trim(),
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        login_type: "google",
    };
    let mailData = JSON.stringify({
        "{{name}}": payload.full_name,
    });
    mail_1.sendWelcomeEmployer(payload.email, payload.full_name, mailData);
    return Employer_1.default.create(payload);
};
exports.saveNewFacebookUser = (profile) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        full_name: `${profile.name.familyName} ${profile.name.givenName}`.trim(),
        avatar: profile.photos[0].value,
        // facebook_link: profile.profileUrl,
        // gender: profile.gender,
        email: profile.emails[0].value,
        info: {
            name: `${profile.name.familyName} ${profile.name.givenName}`.trim(),
            avatar: profile.photos[0].value,
        },
        login_type: "facebook",
        user_chiaser: mongoose_1.default.Types.ObjectId(),
    };
    mail_1.sendWelcome(payload.email, payload.full_name, "");
    return UserRepository_1.default.create(payload);
};
exports.handleTokenAuthUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({
        data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
    }, process.env.USER_JWT_SECRET, { expiresIn: process.env.USER_EXPIRES_ACCESS_TOKEN });
    const refreshToken = jsonwebtoken_1.default.sign({
        data: Object.assign(Object.assign({}, user.toObject()), { accessToken: "", refreshToken: "", info: {}, company_role: [], manager_cv: [], customize_info: {} }),
    }, process.env.USER_JWT_SECRET, { expiresIn: process.env.USER_EXPIRES_REFRESH_TOKEN });
    yield UserRepository_1.default.update({
        _id: user._id,
        accessToken,
        refreshToken,
    });
    return accessToken;
});
exports.handleTokenAuthEmployer = (employer) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({
        data: Object.assign(Object.assign({}, employer.toObject()), { accessToken: "", refreshToken: "" }),
    }, process.env.EMPLOYER_JWT_SECRET, { expiresIn: process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN });
    const refreshToken = jsonwebtoken_1.default.sign({
        data: Object.assign(Object.assign({}, employer.toObject()), { accessToken: "", refreshToken: "" }),
    }, process.env.EMPLOYER_JWT_SECRET, { expiresIn: process.env.EMPLOYER_EXPIRES_REFRESH_TOKEN });
    yield EmployerRepository_1.default.update({
        _id: employer._id,
        accessToken,
        refreshToken,
    });
    return accessToken;
});
//# sourceMappingURL=index.js.map