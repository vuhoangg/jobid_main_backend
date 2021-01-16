import CompanyRatingService from "../../../db/repositories/CompanyRatingRepository";
import CompanyService from "../../../db/repositories/CompanyRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

// export const updateJobRating = async (source, args, context, info) => {
//   if (await authenticateUser(context, context.res)) {
//     let input = args.input;
//     return CompanyRatingService.update(input).then(async (data) => data);
//   }
// };
export const createJobRating = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let input = args.input;
    let loggedUser = context.res.locals.fullUser;

    let findRating = await CompanyRatingService.getBy({ user: loggedUser._id, company: input.company }, {});
    let new_rate = input.rate_value;

    if (findRating) {
      let old_rate = findRating.rate_value;

      input = Object.assign(input, { _id: findRating._id });
      let companyRating = await CompanyRatingService.update(input);
      if (new_rate != old_rate) {
        await CompanyService.decreaseRating(input.company, old_rate);
        await CompanyService.increaseRating(input.company, new_rate);
      }
      return companyRating;
    } else {
      input = Object.assign(input, { user: loggedUser._id });
      await CompanyService.increaseRating(input.company, new_rate);
      let companyRating = await CompanyRatingService.create(input);
      return companyRating;
    }
  }
};
