import JobSkillService from "../../../db/repositories/JobSkillRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobSkill = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobSkillService.update(args.input);
    }
  }
};
export const createJobSkill = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return JobSkillService.create(args.input);
    }
  }
};
