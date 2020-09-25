import BenefitService from "../../../db/repositories/BenefitRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateBenefit = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return BenefitService.update(args.input);
    }
  }
};
export const createBenefit = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    if (isSuperUser(loggedUser.email)) {
      return BenefitService.create(args.input);
    }
  }
};
