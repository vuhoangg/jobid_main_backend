import JobPreferLanguageService from "../../../db/repositories/JobPreferLanguageRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobPreferLanguage = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobPreferLanguageService.update(args.input);
    }
  }
};

export const createJobPreferLanguage = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return JobPreferLanguageService.create(args.input);
    }
  }
};
