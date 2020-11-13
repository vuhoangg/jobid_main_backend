import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";
import CompanyService from "../../../db/repositories/CompanyRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const createCompanyFollow = async (source, args, context, info) => {
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });

    let r1 = await CompanyFollowService.getBy(input, {});
    if (r1) {
      return r1;
    } else {
      let r2 = await CompanyFollowService.create(input);
      await CompanyService.increaseFollow(input.company);
      return r2;
    }
  }
};

export const deleteCompanyFollow = async (source, args, context, info) => {
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { user: loggedUser._id });

    let r1 = await CompanyFollowService.getBy(input, {});
    if (r1) {
      await CompanyFollowService.delete(r1._id);
      await CompanyService.decreaseFollow(input.company);
      return r1;
    }

  }
};