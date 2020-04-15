import JobSkillService from "../../../db/repository/JobSkillRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateJobSkill (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobSkillService.update(args.input);
        }
    }
}
export function createJobSkill (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return JobSkillService.create(args.input);
        }
    }
}