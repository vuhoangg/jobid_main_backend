import CompanyRatingService from "../../../db/repositories/CompanyRatingRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const updateJobRating = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return CompanyRatingService.update(input).then(async (data) => data);
  }
};
export const createJobRating = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    return CompanyRatingService.create(input).then((r) => r);
  }
};
