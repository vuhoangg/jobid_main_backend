import JobTitleService from "../../../db/repository/JobTitleRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobTitle (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobTitleService.update(args.input);
        }
    }
}
export function createJobTitle (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobTitleService.create(args.input);
        }
    }
}