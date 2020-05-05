import JobViewService from "../../../db/repositories/JobViewRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobView(source, args, context, info) {
  const fields = rootField(info);
  return JobViewService.get(args._id, fields)
    .then(async (jobView) => {
      let node = {
        _id: jobView._id,
        job_post: jobView.job_post,
        user: jobView.user,
        created_at: jobView.created_at,
        updated_at: jobView.updated_at,
      };
      return node;
    });
}

export function getJobViews(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return JobViewService.filter(filter, args.limit, page, infos.edges)
    .then(async (jobViews) => {
      let edges = [];
      for (let i = 0; i < jobViews.length; i++) {
        let jobView = {
          cursor: jobViews[i]._id,
          node: {
            _id: jobViews[i]._id,
            job_post: jobViews[i].job_post,
            user: jobViews[i].user,
            created_at: jobViews[i].created_at,
            updated_at: jobViews[i].updated_at,
          }
        };
        edges.push(jobView);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobViewService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: jobViews.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
