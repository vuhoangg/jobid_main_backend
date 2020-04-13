import UserService from "../../../db/repository/UserRepository";

export function updateUser (source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (loggedUser._id.toString() === args.input._id) {
            return UserService.update(args.input);
        }
    }
}