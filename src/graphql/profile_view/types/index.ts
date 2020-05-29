import {
  GraphQLInputObjectType, GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";
import {User} from "../../user/types";
import {JobPost} from "../../job_post/types";

export const ProfileView = new GraphQLObjectType({
  description: "Represents a profile view.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    user_hunter: {type: User},
    user_profile: {type: User},
    view_count: {type: GraphQLInt},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "ProfileView",
});
export const ProfileViewEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of ProfileViewEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(ProfileView),
    },
  },
  name: "ProfileViewEdge",
});
export const ProfileViewConnection = new GraphQLObjectType({
  description: "List of profile views.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(ProfileViewEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "ProfileViewConnection",
});

export const ProfileViewInput = new GraphQLInputObjectType({
  fields: {
    user_profile: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "ProfileViewInput",
  description: "The updated properties for a profile view.",
});

export const ProfileViewArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
