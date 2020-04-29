import JobAlertService from "../../../db/repositories/JobAlertRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobAlert(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.jobAlert._id;
  return JobAlertService.get(_id, fields)
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
  let page = args.page > 50 ? 10 : args.page;
  return JobAlertService.filter(filter, args.limit, page, infos.edges)
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
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: jobAlerts.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
