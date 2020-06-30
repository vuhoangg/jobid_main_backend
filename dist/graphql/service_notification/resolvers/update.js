"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceWorkerNotification = exports.updateServiceWorkerNotification = void 0;
const ServiceNotificationRepository_1 = __importDefault(require("../../../db/repositories/ServiceNotificationRepository"));
const permission_1 = require("../../../helpers/permission");
function updateServiceWorkerNotification(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return ServiceNotificationRepository_1.default.update(args.input);
        }
    }
}
exports.updateServiceWorkerNotification = updateServiceWorkerNotification;
function createServiceWorkerNotification(source, args, context, info) {
    // if (context.isAuthenticated()) {
    //   let loggedUser = context.user;
    //   if (isSuperUser(loggedUser.email)) {
    return ServiceNotificationRepository_1.default.create(args.input);
    //   }
    // }
}
exports.createServiceWorkerNotification = createServiceWorkerNotification;
//# sourceMappingURL=update.js.map