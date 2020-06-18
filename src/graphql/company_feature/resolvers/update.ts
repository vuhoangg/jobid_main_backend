import CompanyFeatureService from "../../../db/repositories/CompanyFeatureRepository";
import { isSuperUser } from "../../../helpers/permission";

export function createCompanyFeature(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.create(args.input);
    }
  }
}

export function updateCompanyFeature(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyFeatureService.update(args.input);
    }
  }
}
