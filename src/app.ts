require("dotenv").config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import graphqlHTTP from "express-graphql";
import multer from "multer";
import passport from "passport";
import passportFacebook from "passport-facebook";
import passportGoogle from "passport-google-oauth20";
import { Connection } from "./db/connection";
import {
  handleTokenAuthEmployer,
  handleTokenAuthUser,
  isExistingEmailEmployer,
  isExistingEmailUser,
  saveNewGoogleEmployer, saveNewGoogleUser
} from "./modules/auth/handles";
import { AuthRouter } from "./modules/auth/router";
import { UploadRouter } from "./modules/upload/router";
import { CvRouter } from "./modules/cv/router";
import { CrawlRouter } from "./modules/crawl/router";

import AppSchema from "./schema";
Connection.connect();
const app = express();
const upload = multer({
  limits: { fieldSize: 50 * 1024 * 1024 }
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(upload.array());

app.use(cookieParser());
app.use(passport.initialize());

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
      cb(null, { user: { accessToken: accessToken } });
    } else {
      const r2 = await saveNewGoogleUser(profile);
      const accessToken = await handleTokenAuthUser(r2);
      cb(null, { user: { accessToken: accessToken } });
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
      cb(null, { employer: { accessToken: accessToken } });
    } else {
      const r2 = await saveNewGoogleEmployer(profile);
      const accessToken = await handleTokenAuthEmployer(r2);
      cb(null, { employer: { accessToken: accessToken } });
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
        cb(null, { user: { accessToken: accessToken } });
      } else {
        const r2 = await saveNewGoogleUser(profile);
        const accessToken = await handleTokenAuthUser(r2);
        cb(null, { user: { accessToken: accessToken } });
      }
    } else {
      cb(null, { user: { accessToken: null } });
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
        cb(null, { employer: { accessToken: accessToken } });
      } else {
        const r2 = await saveNewGoogleUser(profile);
        const accessToken = await handleTokenAuthUser(r2);
        cb(null, { employer: { accessToken: accessToken } });
      }
    } else {
      cb(null, { employer: { accessToken: null } });
    }
  }
);
facebookUserStrategy.name = "facebook_user";
facebookEmployerStrategy.name = "facebook_employer";
passport.use(facebookUserStrategy);
passport.use(facebookEmployerStrategy);

// modules
app.use("/upload", UploadRouter);
app.use("/auth", AuthRouter);
app.use("/cv", CvRouter);
app.use("/crawl", CrawlRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: process.env.APP_ENV !== "production",
    schema: AppSchema,
  })
);

app.listen(process.env.APP_PORT);
console.log(`NodeJS Server running at port ${process.env.APP_PORT}`);
