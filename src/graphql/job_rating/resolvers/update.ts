import JobRatingService from "../../../db/repositories/JobRatingRepository";

export function updateJobRating(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobRatingService.update(input).then(async (data) => {
      return JobRatingService.update(input);
    });
  }
}
export function createJobRating(source, args, context, info) {
  if (context.isAuthenticated()) {
    let input = args.input;
    return JobRatingService.create(input).then(r => r);
  }
}
