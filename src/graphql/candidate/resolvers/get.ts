import CandidateService from "../../../db/repositories/CandidateRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getCandidate(source, args, context, info) {
  const fields = rootField(info);
  return CandidateService.get(args._id, fields)
    .then(async (candidate) => {
      let node = {
        _id: candidate._id,
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        interest: candidate.interest,
        job_open: candidate.job_open,
        user: candidate.user,
        cv: candidate.cv,
        photos: candidate.photos,
        files: candidate.files,
        created_at: candidate.created_at,
        updated_at: candidate.updated_at,
      };
      return node;
    });
}

export function getCandidates(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CandidateService.filter(filter, args.limit, page, infos.edges)
    .then(async (candidates) => {
      let edges = [];
      for (let i = 0; i < candidates.length; i++) {
        let candidate = {
          cursor: candidates[i]._id,
          node: {
            _id: candidates[i]._id,
            first_name: candidates[i].first_name,
            last_name: candidates[i].last_name,
            interest: candidates[i].interest,
            job_open: candidates[i].job_open,
            user: candidates[i].user,
            cv: candidates[i].cv,
            photos: candidates[i].photos,
            files: candidates[i].files,
            created_at: candidates[i].created_at,
            updated_at: candidates[i].updated_at,
          }
        };
        edges.push(candidate);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await CandidateService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: candidates.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
