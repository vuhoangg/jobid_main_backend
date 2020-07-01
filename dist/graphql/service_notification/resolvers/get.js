"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceWorkerNotifications = exports.getServiceWorkerNotification = void 0;
const ServiceNotificationRepository_1 = __importDefault(require("../../../db/repositories/ServiceNotificationRepository"));
const helpers_1 = require("../../helpers");
function getServiceWorkerNotification(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return ServiceNotificationRepository_1.default.get(args._id, fields)
        .then((notification) => __awaiter(this, void 0, void 0, function* () {
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
    }));
}
exports.getServiceWorkerNotification = getServiceWorkerNotification;
function getServiceWorkerNotifications(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return ServiceNotificationRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((notifications) => __awaiter(this, void 0, void 0, function* () {
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
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield ServiceNotificationRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: notifications.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getServiceWorkerNotifications = getServiceWorkerNotifications;
//# sourceMappingURL=get.js.map