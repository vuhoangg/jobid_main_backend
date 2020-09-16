import UserService from "../../../db/repositories/UserRepository";
import { sendWelcome } from "../../../mail";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const isExistingIdUser = async (_id: string) => {
  return UserService.getBy({ _id }, { accessToken: 0, refreshToken: 0 });
};
export function isExistingEmailUser(email: string) {
  return UserService.getBy({ email }, { accessToken: 0, refreshToken: 0 });
}
export const saveNewGoogleUser = async (profile) => {
  let payload = {
    first_name: profile.name.familyName,
    last_name: profile.name.givenName,
    full_name: `${profile.name.familyName.trim()} ${profile.name.givenName.trim()}`,
    email: profile.emails[0].value,
    avatar: profile.photos[0].value,
    login_type: "google",
    user_chiase: mongoose.Types.ObjectId(),
  };
  sendWelcome(payload.email);
  return UserService.create(payload);
};

export const saveNewFacebookUser = (profile: any) => {
  let payload = {
    first_name: profile.name.familyName,
    last_name: profile.name.givenName,
    full_name: `${profile.name.familyName.trim()} ${profile.name.givenName.trim()}`,
    avatar: profile.photos[0].value,
    // facebook_link: profile.profileUrl,
    // gender: profile.gender,
    email: profile.emails[0].value,
    login_type: "facebook",
    user_chiaser: mongoose.Types.ObjectId(),
  };
  sendWelcome(profile.emails[0].value);
  return UserService.create(payload);
};

export const handleTokenAuth = async (user: any) => {
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
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_ACCESS_TOKEN }
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
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_REFRESH_TOKEN }
  );
  await UserService.update({
    _id: user._id,
    accessToken,
    refreshToken,
  });
  return accessToken;
};
