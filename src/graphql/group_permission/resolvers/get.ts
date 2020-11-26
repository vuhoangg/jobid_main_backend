import { filterObject, rootField, rootInfo } from "../../helpers";
import GroupPermissionService from "../../../db/repositories/GroupPermissionRepository";

export function getGroupPermission(source, args, context, info) {
  const fields = rootField(info);
  return GroupPermissionService.get(args._id, fields).then(async (groupPermission) => {
    let node = {
      _id: groupPermission._id,
      name: groupPermission.name,
      description: groupPermission.description,
      permission: groupPermission.permission,
    };
    return node;
  });
}

export function getGroupPermissions(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return GroupPermissionService.filter(filter, limit, page, infos.edges).then(async (groupPermission) => {
    let countData = infos.pageInfo && infos.pageInfo.length ? await GroupPermissionService.count(filter) : 0;
    let dataRet = {
      edges: groupPermission.map((item: any) => ({
        cursor: item._id,
        node: {
          _id: item._id,
          name: item.name,
          description: item.description,
          permission: item.permission,
        },
      })),
      pageInfo: {
        length: countData,
        hasNextPage: groupPermission.length >= limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
