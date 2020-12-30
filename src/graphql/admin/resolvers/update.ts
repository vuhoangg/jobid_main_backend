import AdminService from "../../../db/repositories/AdminRepository";
import { authenticateAdmin } from "../../../middlewares/authenticate";

export const updateAdmin = async (source, args, context, info) => {
    if (await authenticateAdmin(context, context.res)) {
        let loggedAdmin = context.res.locals.fullAdmin;
        let input = args.input;
        input = Object.assign(input, { _id: loggedAdmin._id });
        return AdminService.update(input);
    }
};
