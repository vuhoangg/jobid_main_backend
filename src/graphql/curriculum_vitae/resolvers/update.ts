import CurriculumVitaeService from "../../../db/repositories/CurriculumVitaeRepository";

export function createCurriculumVitae(source, args, context, info) {
  if (context.isAuthenticated()) {
    return CurriculumVitaeService.create(args.input);
  }
}

export function updateCurriculumVitae(source, args, context, info) {
  if (context.isAuthenticated()) {
    return CurriculumVitaeService.update(args.input);
  }
}
