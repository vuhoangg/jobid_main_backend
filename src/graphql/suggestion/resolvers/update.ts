import SuggestionService from "../../../db/repositories/SuggestionRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateSuggestion (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return SuggestionService.update(args.input);
        }
    }
}
export function createSuggestion (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (isSuperUser(loggedUser.email)) {
            return SuggestionService.create(args.input);
        }
    }
}
