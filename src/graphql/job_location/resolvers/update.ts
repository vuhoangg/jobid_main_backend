import JobLocationService from "../../../db/repositories/JobLocationRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobLocation (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobLocationService.update(args.input);
        }
    }
}
export function createJobLocation (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobLocationService.create(args.input);
        }
    }
}
