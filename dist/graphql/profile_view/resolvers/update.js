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
exports.updateProfileView = void 0;
const ProfileViewRepository_1 = __importDefault(require("../../../db/repositories/ProfileViewRepository"));
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
const api_1 = require("../../../utils/api");
function updateProfileView(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { user_hunter: loggedUser._id });
        return ProfileViewRepository_1.default.profileView(input).then((data) => __awaiter(this, void 0, void 0, function* () {
            let notification = {
                type: "user",
                subject: "user_apply_job",
                target: {
                    object_type: data.user_hunter,
                    ref: data.user_profile,
                },
                message: `${loggedUser.first_name} ${loggedUser.last_name} đã xem hồ sơ của bạn`,
                href: "",
                read: false,
            };
            NotificationRepository_1.default.create(notification);
            api_1.api("POST", `${process.env.SOCKET_URL}/socket/notify/${data.user_profile}`, {
                params: {
                    token: "asdasfgasfasd2132",
                },
            }, {
                data: yield NotificationRepository_1.default.create(notification),
            })
                .then((data) => console.log(data))
                .catch((e) => console.log(e));
            // api("POST", `${process.env.BOT_URL}/send_notification`, {
            //   psid: "3332232216822875",
            //   message_type: "profile_view",
            //   message_text: `${loggedUser.first_name} ${loggedUser.last_name} đã xem hồ sơ của bạn`,
            // })
            //   .then((data) => console.log(data))
            //   .catch((e) => console.log(e));
            return data;
        }));
    }
}
exports.updateProfileView = updateProfileView;
//# sourceMappingURL=update.js.map