import ProfileViewService from "../../../db/repositories/ProfileViewRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getProfileView(source, args, context, info) {
  const fields = rootField(info);
  return ProfileViewService.get(args._id, fields)
    .then(async (profileView) => {
      let node = {
        _id: profileView._id,
        user_hunter: profileView.user_hunter,
        user_profile: profileView.user_profile,
        view_count: profileView.view_count,
        created_at: profileView.created_at,
        updated_at: profileView.updated_at,
      };
      return node;
    });
}

export function getProfileViews(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 4000 ? 10 : args.page;
  return ProfileViewService.filter(filter, args.limit, page, infos.edges)
    .then(async (profileViews) => {
      let edges = [];
      for (let i = 0; i < profileViews.length; i++) {
        let profileView = {
          cursor: profileViews[i]._id,
          node: {
            _id: profileViews[i]._id,
            user_hunter: profileViews[i].user_hunter,
            user_profile: profileViews[i].user_profile,
            view_count: profileViews[i].view_count,
            created_at: profileViews[i].created_at,
            updated_at: profileViews[i].updated_at,
          }
        };
        edges.push(profileView);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await ProfileViewService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: profileViews.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
