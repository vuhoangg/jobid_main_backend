import CompanyFeatureService from "../../../db/repositories/CompanyFeatureRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const createCompanyFeature = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.create(args.input);
    }
  }
};

export const updateCompanyFeature = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.update(args.input);
    }
  }
};
