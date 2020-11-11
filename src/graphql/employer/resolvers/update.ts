import EmployerService from "../../../db/repositories/EmployerRepository";
import { isSuperEmployer } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateEmployer = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        if (input && input.customize_info && input.customize_info.first_name && input.customize_info.last_name) {
            input.customize_info.full_name = `${input.customize_info.first_name.trim()} ${input.customize_info.last_name.trim()}`;
        }
        input = Object.assign(input, { _id: loggedEmployer._id });
        return EmployerService.update(input);
    }
};

export const markSpam = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        if (isSuperEmployer(loggedEmployer.email)) {
            return EmployerService.markSpam(input._id);
        }
    }
};

export const removeSpam = async (source, args, context, info) => {
    if (await authenticateUser(context, context.res)) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let input = args.input;
        if (isSuperEmployer(loggedEmployer.email)) {
            return EmployerService.removeSpam(input._id);
        }
    }
};
