"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const mail_1 = require("../../../mail");
function isExistingIdUser(_id) {
    return UserRepository_1.default.getBy({ _id }, { password: 0 });
}
exports.isExistingIdUser = isExistingIdUser;
function isExistingEmailUser(email) {
    return UserRepository_1.default.getBy({ email }, { password: 0 });
}
exports.isExistingEmailUser = isExistingEmailUser;
function saveNewGoogleUser(profile) {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        login_type: "google",
    };
    mail_1.sendWelcome(payload.email);
    return UserRepository_1.default.create(payload);
}
exports.saveNewGoogleUser = saveNewGoogleUser;
exports.saveNewFacebookUser = (profile) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        avatar: profile.photos[0].value,
        // facebook_link: profile.profileUrl,
        // gender: profile.gender,
        email: profile.emails[0].value,
        login_type: "facebook",
    };
    mail_1.sendWelcome(profile.emails[0].value);
    return UserRepository_1.default.create(payload);
};
//# sourceMappingURL=index.js.map