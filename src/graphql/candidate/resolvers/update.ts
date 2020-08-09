import CandidateService from "../../../db/repositories/CandidateRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateCandidate (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return CandidateService.update(args.input);
        }
    }
}
export function createCandidate (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return CandidateService.create(args.input);
        }
    }
}
