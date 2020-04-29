import JobLevelService from "../../../db/repositories/JobLevelRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobLevel(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.jobLevel._id;
  return JobLevelService.get(_id, fields)
    .then(async (jobLevel) => {
      let node = {
        _id: jobLevel._id,
        vi_title: jobLevel.vi_title,
        en_title: jobLevel.en_title,
        vi_slug: jobLevel.vi_slug,
        en_slug: jobLevel.en_slug,
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
            vi_title: jobLevels[i].vi_title,
            en_title: jobLevels[i].en_title,
            vi_slug: jobLevels[i].vi_slug,
            en_slug: jobLevels[i].en_slug,
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
