import {GraphQLNonNull} from "graphql";
import {logout} from "../resolvers/get";
import {LogoutType} from "../types";

const logoutQueries = {
  logout: {
    resolve: (source, args, context, info) => logout(args, context),
    type: new GraphQLNonNull(LogoutType),
  },
};

export default logoutQueries;
