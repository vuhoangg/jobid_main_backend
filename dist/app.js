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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const connection_1 = require("./db/connection");
const router_1 = require("./modules/auth/router");
const router_2 = require("./modules/upload/router");
const mail_1 = require("./modules/mail");
const clientRegistration_1 = require("./modules/clientRegistration");
const schema_1 = __importDefault(require("./schema"));
const handles_1 = require("./modules/auth/handles");
connection_1.Connection.connect();
const app = express_1.default();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(cookie_session_1.default({
    keys: [process.env.COOKIE_KEY],
    maxAge: parseInt(process.env.COOKIE_AGE),
}));
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(cors_1.default({
    credentials: true,
    origin: [
        process.env.SITE_URL,
        process.env.STUDIO_URL,
        process.env.ADMIN_URL,
        process.env.LOCAL_SITE,
        process.env.LOCAL_STUDIO,
        process.env.LOCAL_ADMIN,
        process.env.CHIASE_URL,
    ],
}));
passport_1.default.serializeUser((user, done) => {
    // console.log("serializeUser", user.user);
    done(null, user.user._id || user);
});
passport_1.default.deserializeUser((_id, done) => {
    // console.log("deserializeUser", _id);
    handles_1.isExistingIdUser(_id)
        .then((user) => {
        done(null, user);
    })
        .catch(function (err) {
        done(null, {});
    });
});
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    callbackURL: "/auth/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const r1 = yield handles_1.isExistingEmailUser(profile.emails[0].value);
    if (r1) {
        const accessToken = yield handles_1.handleTokenAuth(r1);
        cb(null, { user: r1, accessToken });
    }
    else {
        const r2 = yield handles_1.saveNewGoogleUser(profile);
        const accessToken = yield handles_1.handleTokenAuth(r2);
        cb(null, { user: r2, accessToken });
    }
})));
const FacebookStrategy = passport_facebook_1.default.Strategy;
passport_1.default.use(new FacebookStrategy({
    clientID: process.env.FACEBOOk_APP_ID,
    clientSecret: process.env.FACEBOOk_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
    profileFields: [
        "id",
        "emails",
        "last_name",
        "first_name",
        "gender",
        "is_verified",
        "profileUrl",
        "picture",
        "displayName",
    ],
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (profile.emails) {
            const r1 = yield handles_1.isExistingEmailUser(profile.emails[0].value);
            if (r1) {
                const accessToken = yield handles_1.handleTokenAuth(r1);
                cb(null, { user: r1, accessToken });
            }
            else {
                const r2 = yield handles_1.saveNewGoogleUser(profile);
                const accessToken = yield handles_1.handleTokenAuth(r2);
                cb(null, { user: r2, accessToken });
            }
        }
        else {
            cb(null, { user: { _id: "" } });
        }
    });
}));
app.use("/upload", router_2.UploadRouter);
app.use("/auth", router_1.AuthRouter);
app.use("/", clientRegistration_1.ServiceNotificationRouter);
app.use("/noreply", mail_1.MailRouter);
app.use("/graphql", express_graphql_1.default({
    graphiql: process.env.APP_ENV !== "production",
    schema: schema_1.default,
}));
app.listen(process.env.APP_PORT);
console.log(`NodeJS Server running at port ${process.env.APP_PORT}`);
//# sourceMappingURL=app.js.map