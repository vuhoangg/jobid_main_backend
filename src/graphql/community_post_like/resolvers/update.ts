import CommunityPostLikeService from "../../../db/repositories/CommunityPostLikeRepository";
import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateCommunityPostLike = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityPostLikeService.update(args.input);
        }
    }
};
export const createCommunityPostLike = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        let r1 = await CommunityPostLikeService.getBy(input, {});
        if (r1) {
            return r1;
        } else {
            let r2 = await CommunityPostLikeService.create(input);
            await CommunityPostService.increaseLike(input.community_post);
            return r2;
        }
    }
};


export const deleteCommunityPostLike = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        let r1 = await CommunityPostLikeService.getBy(input, {});
        if (r1) {
            await CommunityPostLikeService.delete(r1._id);
            await CommunityPostService.decreaseLike(input.community_post);
            return r1;
        }

    }
};