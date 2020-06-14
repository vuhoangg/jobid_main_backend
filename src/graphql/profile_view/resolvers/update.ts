import ProfileViewService from "../../../db/repositories/ProfileViewRepository";
import NotificationService from "../../../db/repositories/NotificationRepository";
import { api } from "../../../utils/api";
export function updateProfileView(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    let input = args.input;
    input = Object.assign(input, { user_hunter: loggedUser._id });
    return ProfileViewService.profileView(input).then(async(data) => {
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
      NotificationService.create(notification);
      api("POST", `${process.env.SOCKET_URL}/socket/notify/${data.user_profile}`, {
        params: {
          token: "asdasfgasfasd2132",
        },
      }, {
        data: await NotificationService.create(notification),
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
    });
  }
}
