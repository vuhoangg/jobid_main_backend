import JobAlertService from "../../../db/repositories/JobAlertRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobAlert(source, args, context, info) {
  const fields = rootField(info);
  return JobAlertService.get(args._id, fields)
    .then(async (jobAlert) => {
      let node = {
        _id: jobAlert._id,
        job_post: jobAlert.job_post,
        user: jobAlert.user,
        created_at: jobAlert.created_at,
        updated_at: jobAlert.updated_at,
      };
      return node;
    });
}

export function getJobAlerts(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return JobAlertService.filter(filter, limit, page, infos.edges)
    .then(async (jobAlerts) => {
      let edges = [];
      for (let i = 0; i < jobAlerts.length; i++) {
        let jobAlert = {
          cursor: jobAlerts[i]._id,
          node: {
            _id: jobAlerts[i]._id,
            job_post: jobAlerts[i].job_post,
            user: jobAlerts[i].user,
            created_at: jobAlerts[i].created_at,
            updated_at: jobAlerts[i].updated_at,
          }
        };
        edges.push(jobAlert);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobAlertService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: jobAlerts.length >= limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
