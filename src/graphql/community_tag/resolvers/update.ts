import CommunityTagService from "../../../db/repositories/CommunityTagRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCommunityTag = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityTagService.update(args.input);
        }
    }
};
export const createCommunityTag = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityTagService.create(args.input);
        }
    }
};
