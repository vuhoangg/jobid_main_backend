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
      rate_value: companyRating.rate_value,
      rate_title: companyRating.rate_title,
      rate_detail: companyRating.rate_detail,
      rate_pros: companyRating.rate_pros,
      rate_cons: companyRating.rate_cons,
      rate_improve: companyRating.rate_improve,
      created_at: companyRating.created_at,
      updated_at: companyRating.updated_at,
    };
    return node;
  });
}

export function getCompanyRatings(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return CompanyRatingService.filter(filter, limit, page, infos.edges).then(async (companyRatings) => {
    let edges = [];
    for (let i = 0; i < companyRatings.length; i++) {
      let companyRating = {
        cursor: companyRatings[i]._id,
        node: {
          _id: companyRatings[i]._id,
          user: companyRatings[i].user,
          company: companyRatings[i].company,
          rate_value: companyRatings[i].rate_value,
          rate_title: companyRatings[i].rate_title,
          rate_detail: companyRatings[i].rate_detail,
          rate_pros: companyRatings[i].rate_pros,
          rate_cons: companyRatings[i].rate_cons,
          rate_improve: companyRatings[i].rate_improve,
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
        hasNextPage: companyRatings.length >= limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
