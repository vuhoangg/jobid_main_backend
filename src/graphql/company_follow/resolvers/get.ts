import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getCompanyFollow(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.companyFollow._id;
  return CompanyFollowService.get(_id, fields)
    .then(async (companyFollow) => {
      let node = {
        _id: companyFollow._id,
        job_post: companyFollow.job_post,
        user: companyFollow.user,
        created_at: companyFollow.created_at,
        updated_at: companyFollow.updated_at,
      };
      return node;
    });
}

export function getCompanyFollows(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CompanyFollowService.filter(filter, args.limit, page, infos.edges)
    .then(async (companyFollows) => {
      let edges = [];
      for (let i = 0; i < companyFollows.length; i++) {
        let companyFollow = {
          cursor: companyFollows[i]._id,
          node: {
            _id: companyFollows[i]._id,
            job_post: companyFollows[i].job_post,
            user: companyFollows[i].user,
            created_at: companyFollows[i].created_at,
            updated_at: companyFollows[i].updated_at,
          }
        };
        edges.push(companyFollow);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await CompanyFollowService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: companyFollows.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
