import ProfileViewService from "../../../db/repositories/ProfileViewRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getProfileView(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.profileView._id;
  return ProfileViewService.get(_id, fields)
    .then(async (profileView) => {
      let node = {
        _id: profileView._id,
        job_post: profileView.job_post,
        user: profileView.user,
        created_at: profileView.created_at,
        updated_at: profileView.updated_at,
      };
      return node;
    });
}

export function getProfileViews(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return ProfileViewService.filter(filter, args.limit, page, infos.edges)
    .then(async (profileViews) => {
      let edges = [];
      for (let i = 0; i < profileViews.length; i++) {
        let profileView = {
          cursor: profileViews[i]._id,
          node: {
            _id: profileViews[i]._id,
            job_post: profileViews[i].job_post,
            user: profileViews[i].user,
            created_at: profileViews[i].created_at,
            updated_at: profileViews[i].updated_at,
          }
        };
        edges.push(profileView);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await ProfileViewService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: profileViews.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
