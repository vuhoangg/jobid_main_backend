import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getUser, getUsers} from "../resolvers/get";
import {User, UserArguments, UserConnection} from "../types";

const userQueries = {
    user: {
        args: UserArguments,
        resolve: (source, args, context, info) => getUser(source, args, context, info),
        type: new GraphQLNonNull(User),
    },
    users: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getUsers(source, args, context, info),
        type: new GraphQLNonNull(UserConnection),
    }
};
export default userQueries;