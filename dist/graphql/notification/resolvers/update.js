"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotification = void 0;
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
function updateNotification(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        return NotificationRepository_1.default.get(input._id, {}).then(r1 => {
            if (r1.target.ref == loggedUser._id) {
                input = Object.assign(input, { user: loggedUser._id });
                return NotificationRepository_1.default.readNotification(input);
            }
            else {
                return r1;
            }
        });
    }
}
exports.updateNotification = updateNotification;
//# sourceMappingURL=update.js.map