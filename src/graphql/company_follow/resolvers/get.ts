import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticate } from "../../../middlewares/authenticate";

export const getCompanyFollow = async (source, args, context, info) => {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { company: args.company };
  if (await authenticate(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    getBy = Object.assign(getBy, { user: loggedUser._id });
  }

  return CompanyFollowService.getBy(getBy, fields).then(async (companyFollow) => {
    if (companyFollow) {
      let node = {
        _id: companyFollow._id,
        company: companyFollow.company,
        user: companyFollow.user,
        created_at: companyFollow.created_at,
        updated_at: companyFollow.updated_at,
      };
      return node;
    } else {
      return null;
    }
  });
};

export function getCompanyFollows(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return CompanyFollowService.filter(filter, args.limit, page, infos.edges).then(async (companyFollows) => {
    let edges = [];
    for (let i = 0; i < companyFollows.length; i++) {
      let companyFollow = {
        cursor: companyFollows[i]._id,
        node: {
          _id: companyFollows[i]._id,
          company: companyFollows[i].company,
          user: companyFollows[i].user,
          created_at: companyFollows[i].created_at,
          updated_at: companyFollows[i].updated_at,
        },
      };
      edges.push(companyFollow);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await CompanyFollowService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: companyFollows.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
