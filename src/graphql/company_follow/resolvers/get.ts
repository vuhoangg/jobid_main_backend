import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getCompanyFollow = async (source, args, context, info) => {
  const fields = rootField(info);

  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let getBy = {
      _id: args._id,
      user: loggedUser._id,
    }
    let companyFollow = await CompanyFollowService.getBy(getBy, fields);
    let node = {
      _id: companyFollow._id,
      company: companyFollow.company,
      user: companyFollow.user,
      created_at: companyFollow.created_at,
      updated_at: companyFollow.updated_at,
    };
    return node;
  }
};

export const getCompanyFollows = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;

  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    filter = Object.assign(filter, { user: loggedUser._id });

    let companyFollows = await CompanyFollowService.filter(filter, args.limit, page, infos.edges);
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
  }
}
