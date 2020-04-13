import UserService from "../../../db/repository/UserRepository";
import {sendWelcome} from "../../../mail";

export function isExistingIdUser(_id: string) {
    return UserService.getBy({_id}, {password: 0});
}
export function isExistingEmailUser(email: string) {
    return UserService.getBy({email}, {password: 0});
}
export function saveNewGoogleUser(profile) {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        login_type: "google",
    };
    sendWelcome(payload.email);
    return UserService.create(payload);
}

export const saveNewFacebookUser = (profile: any) => {
    let payload = {
        first_name: profile.name.familyName,
        last_name: profile.name.givenName,
        avatar: profile.photos[0].value,
        // facebook_link: profile.profileUrl,
        // gender: profile.gender,
        email: profile.emails[0].value,
        login_type: "facebook",
    };
    sendWelcome(profile.emails[0].value);
    return UserService.create(payload);
};