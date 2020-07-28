import JobLevelService from "../../../db/repositories/JobLevelRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobLevel(source, args, context, info) {
  const fields = rootField(info);
  return JobLevelService.get(args._id, fields)
    .then(async (jobLevel) => {
      let node = {
        _id: jobLevel._id,
        title: jobLevel.title,
        slug: jobLevel.slug,
        seo_title: jobLevel.seo_title,
        seo_description: jobLevel.seo_description,
        created_at: jobLevel.created_at,
        updated_at: jobLevel.updated_at,
      };
      return node;
    });
}

export function getJobLevels(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  return JobLevelService.filter(filter, args.limit, args.page, infos.edges)
    .then(async (jobLevels) => {
      let edges = [];
      for (let i = 0; i < jobLevels.length; i++) {
        let jobLevel = {
          cursor: jobLevels[i]._id,
          node: {
            _id: jobLevels[i]._id,
            title: jobLevels[i].title,
            slug: jobLevels[i].slug,
            seo_title: jobLevels[i].seo_title,
            seo_description: jobLevels[i].seo_description,
            created_at: jobLevels[i].created_at,
            updated_at: jobLevels[i].updated_at,
          }
        };
        edges.push(jobLevel);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobLevelService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: jobLevels.length >= args.limit,
          hasPreviousPage: args.page > 1
        }
      };
      return dataRet;
    });
}
