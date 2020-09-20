import CurriculumVitaeService from "../../../db/repositories/CurriculumVitaeRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const createCurriculumVitae = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    return CurriculumVitaeService.create(args.input);
  }
};

export const updateCurriculumVitae = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    return CurriculumVitaeService.update(args.input);
  }
};
