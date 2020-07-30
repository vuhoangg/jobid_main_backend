import CompanyRatingService from "../../../db/repositories/CompanyRatingRepository";

export function updateJobRating(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return CompanyRatingService.update(input).then(async (data) => data);
  }
}
export function createJobRating(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return CompanyRatingService.create(input).then(r => r);
  }
}
