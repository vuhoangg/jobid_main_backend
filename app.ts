import {AuthRouter} from "./modules/auth/router";

require('dotenv').config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import graphqlHTTP from "express-graphql";
import {Connection} from "./db/connection";
import {UploadRouter} from "./modules/upload/router";

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

app.use("/upload", UploadRouter);
app.use("/auth", AuthRouter);

app.listen(process.env.APP_PORT);
console.log(`NodeJS Server running at port ${process.env.APP_PORT}`);
