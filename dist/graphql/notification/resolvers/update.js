"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReadAllNotification = exports.updateReadNotification = exports.updateNotification = void 0;
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
const permission_1 = require("../../../helpers/permission");
function updateNotification(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return NotificationRepository_1.default.update(input);
        }
    }
}
exports.updateNotification = updateNotification;
function updateReadNotification(source, args, context, info) {
    if (context.isAuthenticated()) {
        let input = args.input;
        let loggedUser = context.user;
        input = Object.assign(input, { target: loggedUser._id });
        return NotificationRepository_1.default.readNotification(input).then(r => ({ status: true }));
    }
}
exports.updateReadNotification = updateReadNotification;
function updateReadAllNotification(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = { target: loggedUser._id };
        return NotificationRepository_1.default.readAllNotification(input).then(r => ({ status: true }));
    }
}
exports.updateReadAllNotification = updateReadAllNotification;
//# sourceMappingURL=update.js.map