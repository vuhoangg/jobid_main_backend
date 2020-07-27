import CompanyRatingService from "../../../db/repositories/CompanyRatingRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getCompanyRating(source, args, context, info) {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { job_post: args.job_post };

  return CompanyRatingService.getBy(getBy, fields).then(async (companyRating) => {
    let node = {
      _id: companyRating._id,
      user: companyRating.user,
      company: companyRating.company,
      rat_value: companyRating.rat_value,
      rat_comment: companyRating.rat_content,
      created_at: companyRating.created_at,
      updated_at: companyRating.updated_at,
    };
    return node;
  });
}

export function getCompanyRatings(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CompanyRatingService.filter(filter, args.limit, page, infos.edges).then(async (companyRatings) => {
    let edges = [];
    for (let i = 0; i < companyRatings.length; i++) {
      let companyRating = {
        cursor: companyRatings[i]._id,
        node: {
          _id: companyRatings[i]._id,
          user: companyRatings[i].user,
          company: companyRatings[i].job,
          rat_value: companyRatings[i].rat_value,
          rat_comment: companyRatings[i].rat_comment,
          created_at: companyRatings[i].created_at,
          updated_at: companyRatings[i].updated_at,
        },
      };
      edges.push(companyRating);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await CompanyRatingService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: companyRatings.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
