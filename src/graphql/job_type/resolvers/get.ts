import JobTypeService from "../../../db/repositories/JobTypeRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobType(source, args, context, info) {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { slug: args.slug };
  return JobTypeService.getBy(getBy, fields)
    .then(async (jobType) => {
      let node = {
        _id: jobType._id,
        title: jobType.title,
        slug: jobType.slug,
        seo_title: jobType.seo_title,
        seo_description: jobType.seo_description,
        created_at: jobType.created_at,
        updated_at: jobType.updated_at,
      };
      return node;
    });
}

export function getJobTypes(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return JobTypeService.filter(filter, limit, page, infos.edges)
    .then(async (jobTypes) => {
      let edges = [];
      for (let i = 0; i < jobTypes.length; i++) {
        let jobType = {
          cursor: jobTypes[i]._id,
          node: {
            _id: jobTypes[i]._id,
            title: jobTypes[i].title,
            slug: jobTypes[i].slug,
            seo_title: jobTypes[i].seo_title,
            seo_description: jobTypes[i].seo_description,
            created_at: jobTypes[i].created_at,
            updated_at: jobTypes[i].updated_at,
          }
        };
        edges.push(jobType);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobTypeService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: jobTypes.length >= limit,
          hasPreviousPage: args.page > 1
        }
      };
      return dataRet;
    });
}
