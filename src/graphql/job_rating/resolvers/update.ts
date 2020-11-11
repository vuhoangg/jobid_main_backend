import JobRatingService from "../../../db/repositories/JobRatingRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobRating = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return JobRatingService.update(input).then((data) => data);
  }
};
export const createJobRating = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return JobRatingService.create(input).then((r) => r);
  }
};
