import CompanyFeatureService from "../../../db/repositories/CompanyFeatureRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const createCompanyFeature = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.create(args.input);
    }
  }
};

export const updateCompanyFeature = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.update(args.input);
    }
  }
};
