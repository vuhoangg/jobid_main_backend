import ServiceNotification from "../../../db/repositories/ServiceNotificationRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getServiceWorkerNotification(source, args, context, info) {
    const fields = rootField(info);
    return ServiceNotification.get(args._id, fields)
        .then(async (notification) => {
            let node = {
                _id: notification._id,
                title: notification.title,
                text: notification.text,
                href: notification.href,
                tag: notification.tag,
                icon: notification.icon,
                badge: notification.badge,
                image: notification.image,
                created_at: notification.created_at,
                updated_at: notification.updated_at,
            };
            return node;
        });
}

export function getServiceWorkerNotifications(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    return ServiceNotification.filter(filter, args.limit, page, infos.edges)
        .then(async (notifications) => {
            let edges = [];
            for (let i = 0; i < notifications.length; i++) {
                let notification = {
                    cursor: notifications[i]._id,
                    node: {
                        _id: notifications[i]._id,
                        title: notifications[i].title,
                        text: notifications[i].text,
                        href: notifications[i].href,
                        tag: notifications[i].tag,
                        icon: notifications[i].icon,
                        badge: notifications[i].badge,
                        image: notifications[i].image,
                        created_at: notifications[i].created_at,
                        updated_at: notifications[i].updated_at,
                    }
                };
                edges.push(notification);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await ServiceNotification.count(filter) : 0;
            let dataRet = {
                ...{ edges },
                pageInfo: {
                    length: countData,
                    hasNextPage: notifications.length >= args.limit,
                    hasPreviousPage: page > 1
                }
            };
            return dataRet;
        });
}
