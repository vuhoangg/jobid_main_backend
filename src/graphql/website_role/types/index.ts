import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const WebsiteRole = new GraphQLObjectType({
  name: "WebsiteRole",
  fields: {
    role: {type: GraphQLString},
  },
  description: "Represents the role of an user."
});

export const RoleArgument = {

}
