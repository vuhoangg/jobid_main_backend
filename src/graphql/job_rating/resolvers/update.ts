import JobRatingService from "../../../db/repositories/JobRatingRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateJobRating = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    return JobRatingService.update(input).then((data) => data);
  }
};
export const createJobRating = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let input = args.input;
    return JobRatingService.create(input).then((r) => r);
  }
};
