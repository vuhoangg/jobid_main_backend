import ProfileViewService from "../../../db/repositories/ProfileViewRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
import UserService from "../../../db/repositories/UserRepository";
import { authenticate } from "../../../middlewares/authenticate";

export const updateProfileView = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, { user_hunter: loggedUser._id });
    return ProfileViewService.profileView(input).then(async (data) => {
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
      await NotificationService.create(notification).then((r) => {
        if (data.user_profile.toString() !== loggedUser._id.toString()) {
          const params = {
            token: process.env.SOCKET_TOKEN as string,
          };
          api("POST", `${process.env.SOCKET_SERVER_URL}/socket/notify/${data.user_profile}`, params, {
            data: {
              ...r.toObject(),
              created_at: new Date(r.created_at).getTime().toString(),
              updated_at: new Date(r.updated_at).getTime().toString(),
            },
            type: "main",
          })
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
        }

        UserService.get(data.user_profile, {}).then((r) => {
          if (r && r.psid) {
            api("POST", `${process.env.BOT_URL}/send_notification`, null, {
              psid: r.psid,
              message_type: "profile_view",
              message_text: `${loggedUser.first_name} ${loggedUser.last_name} đã xem hồ sơ của bạn`,
            })
              .then((data) => console.log(data))
              .catch((e) => console.log(e));
          }
        });
      });

      return data;
    });
  }
};
