import CommunityPostLikeService from "../../../db/repositories/CommunityPostLikeRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCommunityPostLike = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityPostLikeService.update(args.input);
        }
    }
};
export const createCommunityPostLike = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return CommunityPostLikeService.create(input);
    }
};
