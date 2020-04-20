import JobPreferLanguageService from "../../../db/repositories/JobPreferLanguageRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobPreferLanguage (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobPreferLanguageService.update(args.input);
        }
    }
}
export function createJobPreferLanguage (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobPreferLanguageService.create(args.input);
        }
    }
}
