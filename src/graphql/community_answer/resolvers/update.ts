import CommunityAnswerService from "../../../db/repositories/CommunityAnswerRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateCommunityAnswer = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return CommunityAnswerService.update(args.input);
        }
    }
};
export const createCommunityAnswer = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return CommunityAnswerService.create(input);
    }
};
