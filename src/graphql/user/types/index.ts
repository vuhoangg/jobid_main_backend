import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";
import {JobLevel} from "../../job_level/types";

export const UserCustomizeInfo = new GraphQLObjectType({
  description: "Represents an user customize info.",
  fields: {
    cover: {type: GraphQLString},
    avatar: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    current_job_title: {type: GraphQLString},
    current_job_level: {type: JobLevel},
    current_experience_number: {type: GraphQLInt},
    phone: {type: GraphQLString},
    birthday: {type: GraphQLString},
    nation: {type: GraphQLString},
    gender: {type: GraphQLString},
    status: {type: GraphQLString},
  },
  name: "UserCustomizeInfo",
});

export const UserCustomizeInfoInput = new GraphQLInputObjectType({
  description: "The updated properties for an user customize info.",
  fields: {
    cover: {type: GraphQLString},
    avatar: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    current_job_title: {type: GraphQLString},
    current_job_level: {type: GraphQLString},
    current_experience_number: {type: GraphQLInt},
    phone: {type: GraphQLString},
    birthday: {type: GraphQLString},
    nation: {type: GraphQLString},
    gender: {type: GraphQLString},
    status: {type: GraphQLString},
  },
  name: "UserCustomizeInfoInput",
});

export const User = new GraphQLObjectType({
  description: "Represents an user.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: GraphQLString},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    birth_day: {type: GraphQLString},
    avatar: {type: GraphQLString},
    gender: {type: GraphQLString},
    login_type: {type: GraphQLString},
    spam: {type: GraphQLInt},
    customize_info: {type: UserCustomizeInfo},

    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "User",
});
export const UserEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of UserEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(User),
    },
  },
  name: "UserEdge",
});
export const UserConnection = new GraphQLObjectType({
  description: "List of users.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(UserEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "UserConnection",
});

export const UserInput = new GraphQLInputObjectType({
  fields: {
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    birth_day: {type: GraphQLString},
    avatar: {type: GraphQLString},
    gender: {type: GraphQLString},
    login_type: {type: GraphQLString},
    spam: {type: GraphQLInt},
    customize_info: {type: UserCustomizeInfoInput},
  },
  name: "UserInput",
  description: "The updated properties for an user.",
});

export const UserArguments = {
  _id: {type: GraphQLString},
};
