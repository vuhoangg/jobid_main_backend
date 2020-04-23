import JobCategoryService from "../../../db/repositories/JobCategoryRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobCategory(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.jobCategory._id;
  return JobCategoryService.get(_id, fields)
    .then(async (jobCategory) => {
      let node = {
        _id: jobCategory._id,
        vi_title: jobCategory.vi_title,
        en_title: jobCategory.en_title,
        vi_slug: jobCategory.vi_slug,
        en_slug: jobCategory.en_slug,
        seo_title: jobCategory.seo_title,
        seo_description: jobCategory.seo_description,
        created_at: jobCategory.created_at,
        updated_at: jobCategory.updated_at,
      };
      return node;
    });
}

export function getJobCategorys(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  return JobCategoryService.filter(filter, args.limit, args.page, infos.edges)
    .then(async (jobCategorys) => {
      let edges = [];
      for (let i = 0; i < jobCategorys.length; i++) {
        let jobCategory = {
          cursor: jobCategorys[i]._id,
          node: {
            _id: jobCategorys[i]._id,
            vi_title: jobCategorys[i].vi_title,
            en_title: jobCategorys[i].en_title,
            vi_slug: jobCategorys[i].vi_slug,
            en_slug: jobCategorys[i].en_slug,
            seo_title: jobCategorys[i].seo_title,
            seo_description: jobCategorys[i].seo_description,
            created_at: jobCategorys[i].created_at,
            updated_at: jobCategorys[i].updated_at,
          }
        };
        edges.push(jobCategory);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobCategoryService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: jobCategorys.length >= args.limit,
          hasPreviousPage: args.page > 1
        }
      };
      return dataRet;
    });
}
