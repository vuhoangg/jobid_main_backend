import CompanyService from "../../../db/repositories/CompanyRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateCompany (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return CompanyService.update(args.input);
        }
    }
}
export function createCompany (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return CompanyService.create(args.input);
        }
    }
}
