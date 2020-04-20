import BenefitService from "../../../db/repositories/BenefitRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateBenefit (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return BenefitService.update(args.input);
        }
    }
}
export function createBenefit (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return BenefitService.create(args.input);
        }
    }
}
