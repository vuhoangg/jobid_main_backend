import JobRegisterService from "../../../db/repositories/JobRegisterRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobRegister = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        if (isSuperUser(loggedUser.email)) {
            return JobRegisterService.update(args.input);
        }
    }
};
export const createJobRegister = async (source, args, context, info) => {
    return JobRegisterService.create(args.input);
};
