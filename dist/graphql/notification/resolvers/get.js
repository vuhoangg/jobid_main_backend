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
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
const helpers_1 = require("../../helpers");
function getNotification(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return NotificationRepository_1.default.get(args._id, fields)
        .then((notification) => __awaiter(this, void 0, void 0, function* () {
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
    }));
}
exports.getNotification = getNotification;
function getNotifications(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return NotificationRepository_1.default.filter(filter, limit, page, infos.edges)
        .then((notifications) => __awaiter(this, void 0, void 0, function* () {
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
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield NotificationRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: notifications.length >= limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getNotifications = getNotifications;
//# sourceMappingURL=get.js.map