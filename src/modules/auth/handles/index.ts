import UserService from "../../../db/repositories/UserRepository";
import EmployerService from "../../../db/repositories/EmployerRepository";
import { sendWelcome, sendWelcomeEmployer } from "../../../mail";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Employer from "../../../db/schemas/Employer";

export const isExistingEmailUser = (email: string) => {
  let getBy = {
    email: email,
  }
  return UserService.getBy(getBy, {});
}

export const isExistingEmailEmployer = (email: string) => {
  let getBy = {
    email: email,
  }
  return EmployerService.getBy(getBy, {});
}

export const saveNewGoogleUser = (profile) => {
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
    user_chiase: mongoose.Types.ObjectId(),
  };
  let mailData = JSON.stringify({
    "{{name}}": payload.full_name,
  });
  sendWelcome(payload.email, payload.full_name, mailData);
  return UserService.create(payload);
};

export const saveNewGoogleEmployer = (profile) => {
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
  sendWelcomeEmployer(payload.email, payload.full_name, mailData);
  return Employer.create(payload);
};

export const saveNewFacebookUser = (profile: any) => {
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
    user_chiaser: mongoose.Types.ObjectId(),
  };
  sendWelcome(payload.email, payload.full_name, "");
  return UserService.create(payload);
};

export const handleTokenAuthUser = async (user: any) => {
  const accessToken = jwt.sign(
    {
      data: {
        ...user.toObject(),
        accessToken: "",
        refreshToken: "",
        info: {},
        company_role: [],
        manager_cv: [],
        customize_info: {},
      },
    },
    process.env.USER_JWT_SECRET,
    { expiresIn: process.env.USER_EXPIRES_ACCESS_TOKEN }
  );
  const refreshToken = jwt.sign(
    {
      data: {
        ...user.toObject(),
        accessToken: "",
        refreshToken: "",
        info: {},
        company_role: [],
        manager_cv: [],
        customize_info: {},
      },
    },
    process.env.USER_JWT_SECRET,
    { expiresIn: process.env.USER_EXPIRES_REFRESH_TOKEN }
  );
  await UserService.update({
    _id: user._id,
    accessToken,
    refreshToken,
  });
  return accessToken;
};


export const handleTokenAuthEmployer = async (employer: any) => {
  const accessToken = jwt.sign(
    {
      data: {
        ...employer.toObject(),
        accessToken: "",
        refreshToken: "",
      },
    },
    process.env.EMPLOYER_JWT_SECRET,
    { expiresIn: process.env.EMPLOYER_EXPIRES_ACCESS_TOKEN }
  );
  const refreshToken = jwt.sign(
    {
      data: {
        ...employer.toObject(),
        accessToken: "",
        refreshToken: "",
      },
    },
    process.env.EMPLOYER_JWT_SECRET,
    { expiresIn: process.env.EMPLOYER_EXPIRES_REFRESH_TOKEN }
  );
  await EmployerService.update({
    _id: employer._id,
    accessToken,
    refreshToken,
  });
  return accessToken;
}
