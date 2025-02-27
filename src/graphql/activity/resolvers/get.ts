import { filterObject, rootInfo } from "../../helpers";
import ActivityService from "../../../db/repositories/ActivityRepository";

export function getActivitys(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return ActivityService.filter(filter, limit, page, infos.edges)
    .then(async (activitys) => {
      let edges = [];
      for (let i = 0; i < activitys.length; i++) {
        let activity = {
          cursor: activitys[i]._id,
          node: {
            _id: activitys[i]._id,
            name: activitys[i].name,
            message: activitys[i].message,
            href_type: activitys[i].href_type,
            href_url: activitys[i].href_url,
            created_at: activitys[i].created_at,
            updated_at: activitys[i].updated_at,
          }
        };
        edges.push(activity);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await ActivityService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: activitys.length >= limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
