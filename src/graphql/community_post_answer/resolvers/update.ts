import CommunityPostAnswerService from "../../../db/repositories/CommunityPostAnswerRepository";
import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateCommunityPostAnswer = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityPostAnswerService.update(args.input);
        }
    }
};
export const createCommunityPostAnswer = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        let r = CommunityPostAnswerService.create(input);
        await CommunityPostService.increaseAnswerCount(input.community_post);
        return r;
    }
};
