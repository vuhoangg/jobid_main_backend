import { filterObject, rootField, rootInfo } from "../../helpers";
import CompanyFeatureService from "../../../db/repositories/CompanyFeatureRepository";

export function getCompanyFeature(source, args, context, info) {
  const fields = rootField(info);
  return CompanyFeatureService.get(args._id, fields).then(async (companyFeature) => {
    let node = {
      _id: companyFeature._id,
      name: companyFeature.name,
      description: companyFeature.description,
      created_at: companyFeature.created_at,
      updated_at: companyFeature.updated_at,
    };
    return node;
  });
}

export function getCompanyFeatures(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CompanyFeatureService.filter(filter, args.limit, page, infos.edges).then(async (companyFeature) => {
    let countData = infos.pageInfo && infos.pageInfo.length ? await CompanyFeatureService.count(filter) : 0;
    let dataRet = {
      edges: companyFeature.map((item: any) => ({
        cursor: item._id,
        node: {
          _id: item._id,
          name: item.name,
          description: item.description,
          created_at: item.created_at,
          updated_at: item.updated_at,
        },
      })),
      pageInfo: {
        length: countData,
        hasNextPage: companyFeature.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
