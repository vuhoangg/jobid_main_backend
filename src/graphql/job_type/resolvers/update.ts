import JobTypeService from "../../../db/repositories/JobTypeRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobType (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobTypeService.update(args.input);
        }
    }
}
export function createJobType (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobTypeService.create(args.input);
        }
    }
}
