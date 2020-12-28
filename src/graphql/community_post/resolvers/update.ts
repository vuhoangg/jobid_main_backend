import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import CommunityPostViewService from "../../../db/repositories/CommunityPostViewRepository";
import { isSuperUser } from "../../../helpers/permission";
import { toSlug } from "../../../helpers/string";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateCommunityPost = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let communityPost = await CommunityPostService.get(input._id, {});

        if (communityPost.user._id == loggedUser._id) {
            return CommunityPostService.update(args.input);
        }
    }
};
export const createCommunityPost = async (source, args, context, info) => {
    return CommunityPostService.create(args.input);
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let slug = toSlug(input.title, true);
        input = Object.assign(input, { user: loggedUser._id, slug: slug });
        return CommunityPostService.create(input);
    }
};


export const trackingBySlug = async (source, args, context, info) => {
    let input = args.input;
    let community_post = await CommunityPostService.increaseViewCountBySlug(input.slug);
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let payload = {
            community_post: community_post._id,
            user: loggedUser._id,
        }
        await CommunityPostViewService.create(payload);
    }
    return {
        status: true
    }
}
