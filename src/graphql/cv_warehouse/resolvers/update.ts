import CvWarehouseService from "../../../db/repositories/CvWarehouseRepository";
import { authenticateEmployer } from "../../../middlewares/authenticate";

export const updateCvWarehouse = async (source, args, context, info) => {
  let isAuthenticated = authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    let _id = args.input._id;
    let r1 = await CvWarehouseService.get(_id, {});
    if (r1 && r1.employer.toString() == loggedEmployer._id.toString()) {
      return CvWarehouseService.update(args.input);
    } else {
      return r1;
    }
  }
};

export const createCvWarehouse = async (source, args, context, info) => {
  let input = args.input;
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    input = Object.assign(input, { employer: loggedEmployer._id });
    return CvWarehouseService.create(input);
  }
};