require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
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
import { isExistingEmailUser, isExistingIdUser, saveNewFacebookUser, saveNewGoogleUser } from "./modules/auth/handles";
Connection.connect();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    maxAge: parseInt(process.env.COOKIE_AGE),
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
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
    ],
  })
);



passport.serializeUser((user: any, done) => {
  // console.log("serializeUser", user);
  done(null, user._id);
});

passport.deserializeUser((_id: string, done) => {
  // console.log("deserializeUser", _id);
  isExistingIdUser(_id)
    .then((user) => {
      done(null, user);
    })
    .catch(function (err) {
      console.log(err);
    });
});

const GoogleStrategy = passportGoogle.Strategy;
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, cb) => {
      isExistingEmailUser(profile.emails[0].value).then((r1) => {
        if (r1) {
          cb(null, r1);
        } else {
          saveNewGoogleUser(profile).then((r2) => {
            cb(null, r2);
          });
        }
      });
    }
  )
);

const FacebookStrategy = passportFacebook.Strategy;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOk_APP_ID,
      clientSecret: process.env.FACEBOOk_APP_SECRET,
      callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
      profileFields: [
        "id",
        "email",
        "last_name",
        "first_name",
        "middle_name",
        "gender",
        "is_verified",
        "profileUrl",
        "picture",
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      isExistingEmailUser(profile.emails[0].value).then((r1) => {
        if (r1) {
          cb(null, r1);
        } else {
          saveNewFacebookUser(profile).then((r2) => {
            cb(null, r2);
          });
        }
      });
    }
  )
);

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
