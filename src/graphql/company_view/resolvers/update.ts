import CompanyViewService from "../../../db/repositories/CompanyViewRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCompanyView = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });
    return CompanyViewService.viewCompany(input);
  }
};
