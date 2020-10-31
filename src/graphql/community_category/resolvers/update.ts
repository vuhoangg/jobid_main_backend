import CommunityCategoryService from "../../../db/repositories/CommunityCategoryRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCommunityCategory = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityCategoryService.update(args.input);
        }
    }
};
export const createCommunityCategory = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityCategoryService.create(args.input);
        }
    }
};
