import JobKeywordService from "../../../db/repositories/JobKeywordRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getJobKeyword = async (source, args, context, info) => {
  const fields = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };

  let jobKeyword = await JobKeywordService.getBy(getBy, fields);
  if (jobKeyword) {
    let node = {
      _id: jobKeyword._id,
      title: jobKeyword.title,
      slug: jobKeyword.slug,
      keyword: jobKeyword.keyword,
      seo_title: jobKeyword.seo_title,
      seo_description: jobKeyword.seo_description,
      created_at: jobKeyword.created_at,
      updated_at: jobKeyword.updated_at,
    };
    return node;
  }

}

export function getJobKeywords(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  return JobKeywordService.filter(filter, args.limit, args.page, infos.edges)
    .then(async (jobKeywords) => {
      let edges = [];
      for (let i = 0; i < jobKeywords.length; i++) {
        let jobKeyword = {
          cursor: jobKeywords[i]._id,
          node: {
            _id: jobKeywords[i]._id,
            title: jobKeywords[i].title,
            slug: jobKeywords[i].slug,
            keyword: jobKeywords[i].keyword,
            seo_title: jobKeywords[i].seo_title,
            seo_description: jobKeywords[i].seo_description,
            created_at: jobKeywords[i].created_at,
            updated_at: jobKeywords[i].updated_at,
          }
        };
        edges.push(jobKeyword);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobKeywordService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: jobKeywords.length >= args.limit,
          hasPreviousPage: args.page > 1
        }
      };
      return dataRet;
    });
}
