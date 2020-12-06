import CvEmployerService from "../../../db/repositories/CvEmployerRepository";
import CvWarehouseService from "../../../db/repositories/CvWarehouseRepository";
import { authenticateEmployer } from "../../../middlewares/authenticate";

export const updateCvEmployer = async (source, args, context, info) => {
  let isAuthenticated = authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    let _id = args.input._id;
    let r1 = await CvEmployerService.get(_id, {});
    let r2 = await CvWarehouseService.get(r1.cv_warehouse, {});
    if (loggedEmployer._id == r2.employer) {
      return CvEmployerService.update(args.input);
    } else {
      return r1;
    }
  }
};

export const createCvEmployer = async (source, args, context, info) => {
  let input = args.input;
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;

    return CvEmployerService.create(input);
  }
};