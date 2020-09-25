import CandidateService from "../../../db/repositories/CandidateRepository";
import { isSuperUser } from "../../../helpers/permission";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCandidate = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    return CandidateService.get(input._id, {}).then((r) => {
      if (r && r.upload_by._id.toString() == loggedUser._id.toString()) {
        return CandidateService.update(args.input);
      } else {
        return r;
      }
    });
  }
};
export const createCandidate = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    input = Object.assign(input, { upload_by: loggedUser._id });
    return CandidateService.create(input);
  }
};
