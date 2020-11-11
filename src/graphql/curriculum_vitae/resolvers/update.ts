import CurriculumVitaeService from "../../../db/repositories/CurriculumVitaeRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const createCurriculumVitae = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    return CurriculumVitaeService.create(args.input);
  }
};

export const updateCurriculumVitae = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    return CurriculumVitaeService.update(args.input);
  }
};
