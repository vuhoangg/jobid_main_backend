import CompanyNotificationRegisterService from "../../../db/repositories/CompanyNotificationRegisterRepository";
import CompanyService from "../../../db/repositories/CompanyRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const createCompanyNotificationRegister = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        let r1 = await CompanyNotificationRegisterService.getBy(input, {});
        if (!r1) {
            let r2 = await CompanyNotificationRegisterService.create(input);
            return r2;
        }
    }
};

export const deleteCompanyNotificationRegister = async (source, args, context, info) => {
    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });

        let r1 = await CompanyNotificationRegisterService.getBy(input, {});
        if (r1) {
            await CompanyNotificationRegisterService.delete(r1._id);
            return r1;
        }

    }
};