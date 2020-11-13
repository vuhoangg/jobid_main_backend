import BannerService from "../../../db/repositories/BannerRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateBanner = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return BannerService.update(args.input);
        }
    }
};
export const createBanner = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return BannerService.create(args.input);
        }
    }
};
