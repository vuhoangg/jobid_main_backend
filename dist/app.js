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
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const connection_1 = require("./db/connection");
const handles_1 = require("./modules/auth/handles");
const router_1 = require("./modules/auth/router");
const router_2 = require("./modules/upload/router");
const router_3 = require("./modules/cv/router");
const router_4 = require("./modules/crawl/router");
const schema_1 = __importDefault(require("./schema"));
connection_1.Connection.connect();
const app = express_1.default();
const upload = multer_1.default({
    limits: { fieldSize: 50 * 1024 * 1024 }
});
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(upload.array());
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(cors_1.default({
    credentials: true,
    origin: [
        /\.ketnoiviec\.net$/,
        process.env.SITE_URL,
        process.env.STUDIO_URL,
        process.env.ADMIN_URL,
        process.env.LOCAL_SITE,
        process.env.LOCAL_STUDIO,
        process.env.LOCAL_ADMIN,
        process.env.CHIASE_URL,
        process.env.BETA_URL
    ],
}));
passport_1.default.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    console.log("deserializeUser");
    done(null, obj);
});
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const googleUserStrategy = new GoogleStrategy({
    callbackURL: `${process.env.API_URL}/auth/user/google/callback`,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const r1 = yield handles_1.isExistingEmailUser(profile.emails[0].value);
    if (r1) {
        const accessToken = yield handles_1.handleTokenAuthUser(r1);
        cb(null, { user: { accessToken: accessToken } });
    }
    else {
        const r2 = yield handles_1.saveNewGoogleUser(profile);
        const accessToken = yield handles_1.handleTokenAuthUser(r2);
        cb(null, { user: { accessToken: accessToken } });
    }
}));
const googleEmployerStrategy = new GoogleStrategy({
    callbackURL: `${process.env.API_URL}/auth/employer/google/callback`,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const r1 = yield handles_1.isExistingEmailEmployer(profile.emails[0].value);
    if (r1) {
        const accessToken = yield handles_1.handleTokenAuthEmployer(r1);
        cb(null, { employer: { accessToken: accessToken } });
    }
    else {
        const r2 = yield handles_1.saveNewGoogleEmployer(profile);
        const accessToken = yield handles_1.handleTokenAuthEmployer(r2);
        cb(null, { employer: { accessToken: accessToken } });
    }
}));
googleUserStrategy.name = "google_user";
googleEmployerStrategy.name = "google_employer";
passport_1.default.use(googleUserStrategy);
passport_1.default.use(googleEmployerStrategy);
const FacebookStrategy = passport_facebook_1.default.Strategy;
const facebookUserStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/user/facebook/callback`,
    profileFields: [
        "id",
        "emails",
        "last_name",
        "first_name",
        "gender",
        "profileUrl",
        "picture",
        "displayName",
    ],
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const r1 = yield handles_1.isExistingFbUser(profile.id);
        if (r1) {
            const accessToken = yield handles_1.handleTokenAuthUser(r1);
            cb(null, { user: { accessToken: accessToken } });
        }
        else {
            const r2 = yield handles_1.saveNewFacebookUser(profile);
            const accessToken = yield handles_1.handleTokenAuthUser(r2);
            cb(null, { user: { accessToken: accessToken } });
        }
    });
});
const facebookEmployerStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/employer/facebook/callback`,
    profileFields: [
        "id",
        "emails",
        "last_name",
        "first_name",
        "gender",
        "profileUrl",
        "picture",
        "displayName",
    ],
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (profile.emails) {
            const r1 = yield handles_1.isExistingEmailUser(profile.emails[0].value);
            if (r1) {
                const accessToken = yield handles_1.handleTokenAuthUser(r1);
                cb(null, { employer: { accessToken: accessToken } });
            }
            else {
                const r2 = yield handles_1.saveNewGoogleUser(profile);
                const accessToken = yield handles_1.handleTokenAuthUser(r2);
                cb(null, { employer: { accessToken: accessToken } });
            }
        }
        else {
            cb(null, { employer: { accessToken: null } });
        }
    });
});
facebookUserStrategy.name = "facebook_user";
facebookEmployerStrategy.name = "facebook_employer";
passport_1.default.use(facebookUserStrategy);
passport_1.default.use(facebookEmployerStrategy);
// modules
app.use("/upload", router_2.UploadRouter);
app.use("/auth", router_1.AuthRouter);
app.use("/cv", router_3.CvRouter);
app.use("/crawl", router_4.CrawlRouter);
app.use("/graphql", express_graphql_1.default({
    graphiql: process.env.APP_ENV !== "production",
    schema: schema_1.default,
}));
app.listen(process.env.APP_PORT);
console.log(`NodeJS Server running at port ${process.env.APP_PORT}`);
//# sourceMappingURL=app.js.map