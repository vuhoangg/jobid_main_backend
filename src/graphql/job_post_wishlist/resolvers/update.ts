import JobPostWishlistService from "../../../db/repositories/JobPostWishlistRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const createJobPostWishlist = async (source, args, context, info) => {
    if (await authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        return JobPostWishlistService.getBy(input, {}).then((r1) => {
            if (r1) {
                return r1;
            } else {
                return JobPostWishlistService.create(input);
            }
        });
    }
};

export const deleteJobPostWishlist = async (source, args, context, info) => {
    if (await authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        return JobPostWishlistService.getBy(input, {}).then((r1) => {
            if (r1) {
                return JobPostWishlistService.delete(r1._id).then(x => r1);
            } else {
                return null;
            }
        });
    }
};
