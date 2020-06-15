import ProfileViewService from "../../../db/repositories/ProfileViewRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import {api} from "../../../utils/api";
import UserService from "../../../db/repositories/UserRepository";

export function updateProfileView(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, {user_hunter: loggedUser._id});
    return ProfileViewService.profileView(input).then(async (data) => {
      console.log("updateProfileView -> data", data)

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
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      await NotificationService.create(notification);
      const params = {
        token: process.env.SOCKET_TOKEN as string,
      };
      api("POST", `${process.env.SOCKET_SERVER_URL}/socket/notify/${data.user_profile}`, params, {
        data: notification,
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e));

      UserService.get(data.user_profile, {}).then(r => {
        if (r && r.psid) {
          api("POST", `${process.env.BOT_URL}/send_notification`, null,{
            psid: r.psid,
            message_type: "profile_view",
            message_text: `${loggedUser.first_name} ${loggedUser.last_name} đã xem hồ sơ của bạn`,
          })
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
        }
      });

      return data;
    });
  }
}
