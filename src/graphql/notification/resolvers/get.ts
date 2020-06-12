import NotificationService from "../../../db/repositories/NotificationRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getNotification(source, args, context, info) {
  const fields = rootField(info);
  return NotificationService.get(args._id, fields)
    .then(async (notification) => {
      let node = {
        _id: notification._id,
        type: notification.type,
        subject: notification.subject,
        target: notification.target,
        message: notification.message,
        href: notification.href,
        read: notification.read,
        created_at: notification.created_at,
        updated_at: notification.updated_at,
      };
      return node;
    });
}

export function getNotifications(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  let page = args.page > 50 ? 10 : args.page;
  return NotificationService.filter(filter, args.limit, page, infos.edges)
    .then(async (notifications) => {
      let edges = [];
      for (let i = 0; i < notifications.length; i++) {
        let notification = {
          cursor: notifications[i]._id,
          node: {
            _id: notifications[i]._id,
            type: notifications[i].type,
            subject: notifications[i].subject,
            target: notifications[i].target,
            message: notifications[i].message,
            href: notifications[i].href,
            read: notifications[i].read,
            created_at: notifications[i].created_at,
            updated_at: notifications[i].updated_at,
          }
        };
        edges.push(notification);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await NotificationService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: notifications.length >= args.limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
