import JobCategoryService from "../../../db/repositories/JobCategoryRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobCategory (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobCategoryService.update(args.input);
        }
    }
}
export function createJobCategory (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobCategoryService.create(args.input);
        }
    }
}
