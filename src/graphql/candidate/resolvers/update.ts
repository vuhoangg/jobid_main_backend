import CandidateService from "../../../db/repositories/CandidateRepository";
import {isSuperUser} from "../../../helpers/permission";

export function updateCandidate (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        return CandidateService.get(input._id, {}).then(r => {
          if (r && r.upload_by.toString() == loggedUser._id.toString()) {
            return CandidateService.update(args.input);
          } else {
            return r;
          }
        })
    }
}
export function createCandidate (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, {upload_by: loggedUser._id});
        return CandidateService.create(input);
    }
}
