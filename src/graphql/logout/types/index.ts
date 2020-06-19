import {GraphQLBoolean, GraphQLObjectType} from "graphql";

export const LogoutType = new GraphQLObjectType({
  description: "Profile logout",
  fields: {
    status: {type: GraphQLBoolean},
  },
  name: "Logout",
});
