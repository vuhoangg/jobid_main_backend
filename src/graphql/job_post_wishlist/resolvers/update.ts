import JobPostWishlistService from "../../../db/repositories/JobPostWishlistRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const createJobPostWishlist = async (source, args, context, info) => {
    if (await authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        return JobPostWishlistService.get(input._id, {}).then((r1) => {
            if (r1) {
                return r1;
            } else {
                input = Object.assign(input, { user: loggedUser._id });
                return JobPostWishlistService.create(input);
            }
        });
    }
};

export const deleteJobPostWishlist = async (source, args, context, info) => {
    if (await authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        return JobPostWishlistService.get(input._id, {}).then((r1) => {
            if (r1 && r1.user.toString() == loggedUser._id.toString()) {
                return JobPostWishlistService.delete(input._id);
            } else {
                return null;
            }
        });
    }
};
