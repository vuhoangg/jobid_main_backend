require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import graphqlHTTP from "express-graphql";
import { Connection } from "./db/connection";
import { AuthRouter } from "./modules/auth/router";
import { UploadRouter } from "./modules/upload/router";
import { MailRouter } from "./modules/mail";
import { ServiceNotificationRouter } from "./modules/clientRegistration";
import AppSchema from "./schema";
import {
  isExistingEmailUser,
  saveNewGoogleUser,
  handleTokenAuthUser,
  handleTokenAuthEmployer,
  isExistingEmailEmployer,
  saveNewGoogleEmployer,
} from "./modules/auth/handles";
Connection.connect();
const app = express();
const upload = multer();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(upload.array());
// app.use(
//   cookieSession({
//     keys: [process.env.COOKIE_KEY],
//     maxAge: parseInt(process.env.COOKIE_AGE),
//   })
// );
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.SITE_URL,
      process.env.STUDIO_URL,
      process.env.ADMIN_URL,
      process.env.LOCAL_SITE,
      process.env.LOCAL_STUDIO,
      process.env.LOCAL_ADMIN,
      process.env.CHIASE_URL,
      process.env.BETA_URL
    ],
  })
);

passport.serializeUser((user: any, done) => {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  console.log("deserializeUser");
  done(null, obj);
  // isExistingIdUser(_id)
  //   .then((user) => {
  //     done(null, user);
  //   })
  //   .catch(function (err) {
  //     done(null, {});
  //   });
});

const GoogleStrategy = passportGoogle.Strategy;
const googleUserStrategy = new GoogleStrategy(
  {
    callbackURL: "/auth/user/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const r1 = await isExistingEmailUser(profile.emails[0].value);
    if (r1) {
      const accessToken = await handleTokenAuthUser(r1);
      cb(null, { accessToken: accessToken });
    } else {
      const r2 = await saveNewGoogleUser(profile);
      const accessToken = await handleTokenAuthUser(r2);
      cb(null, { accessToken: accessToken });
    }
  }
);
const googleEmployerStrategy = new GoogleStrategy(
  {
    callbackURL: "/auth/employer/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const r1 = await isExistingEmailEmployer(profile.emails[0].value);
    if (r1) {
      const accessToken = await handleTokenAuthEmployer(r1);
      cb(null, { accessToken: accessToken });
    } else {
      const r2 = await saveNewGoogleEmployer(profile);
      const accessToken = await handleTokenAuthEmployer(r2);
      cb(null, { accessToken: accessToken });
    }
  }
);

googleUserStrategy.name = "google_user";
googleEmployerStrategy.name = "google_employer";

passport.use(googleUserStrategy);
passport.use(googleEmployerStrategy);


const FacebookStrategy = passportFacebook.Strategy;
const facebookUserStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOk_APP_ID,
    clientSecret: process.env.FACEBOOk_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/user/facebook/callback`,
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
  },
  async function (accessToken, refreshToken, profile, cb) {
    if (profile.emails) {
      const r1 = await isExistingEmailUser(profile.emails[0].value);
      if (r1) {
        const accessToken = await handleTokenAuthUser(r1);
        cb(null, { accessToken: accessToken });
      } else {
        const r2 = await saveNewGoogleUser(profile);
        const accessToken = await handleTokenAuthUser(r2);
        cb(null, { accessToken: accessToken });
      }
    } else {
      cb(null, { accessToken: null });
    }
  }
);

const facebookEmployerStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOk_APP_ID,
    clientSecret: process.env.FACEBOOk_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/employer/facebook/callback`,
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
  },
  async function (accessToken, refreshToken, profile, cb) {
    if (profile.emails) {
      const r1 = await isExistingEmailUser(profile.emails[0].value);
      if (r1) {
        const accessToken = await handleTokenAuthUser(r1);
        cb(null, { accessToken: accessToken });
      } else {
        const r2 = await saveNewGoogleUser(profile);
        const accessToken = await handleTokenAuthUser(r2);
        cb(null, { accessToken: accessToken });
      }
    } else {
      cb(null, { accessToken: null });
    }
  }
);
facebookUserStrategy.name = "facebook_user";
facebookEmployerStrategy.name = "facebook_employer";
passport.use(facebookUserStrategy);
passport.use(facebookEmployerStrategy);

app.use("/upload", UploadRouter);
app.use("/auth", AuthRouter);

app.use("/", ServiceNotificationRouter);
app.use("/noreply", MailRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: process.env.APP_ENV !== "production",
    schema: AppSchema,
  })
);

app.listen(process.env.APP_PORT);
console.log(`NodeJS Server running at port ${process.env.APP_PORT}`);
