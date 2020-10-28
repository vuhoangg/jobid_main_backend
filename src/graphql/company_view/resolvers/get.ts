import CompanyViewService from "../../../db/repositories/CompanyViewRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getCompanyView(source, args, context, info) {
  const fields = rootField(info);
  return CompanyViewService.get(args._id, fields)
    .then(async (companyView) => {
      let node = {
        _id: companyView._id,
        company: companyView.company,
        user: companyView.user,
        created_at: companyView.created_at,
        updated_at: companyView.updated_at,
      };
      return node;
    });
}

export function getCompanyViews(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CompanyViewService.filter(filter, args.limit, page, infos.edges)
    .then(async (companyViews) => {
      let edges = [];
      for (let i = 0; i < companyViews.length; i++) {
        let companyView = {
          cursor: companyViews[i]._id,
          node: {
            _id: companyViews[i]._id,
            company: companyViews[i].company,
            user: companyViews[i].user,
            created_at: companyViews[i].created_at,
            updated_at: companyViews[i].updated_at,
          }
        };
        edges.push(companyView);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await CompanyViewService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: companyViews.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
