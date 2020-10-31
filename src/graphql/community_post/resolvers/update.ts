import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCommunityPost = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let communityPost = await CommunityPostService.get(input._id, {});
        if (communityPost.user == loggedUser._id) {
            return CommunityPostService.update(args.input);
        }
    }
};
export const createCommunityPost = async (source, args, context, info) => {
    let isAuthenticated = await authenticate(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return CommunityPostService.create(input);
    }
};
