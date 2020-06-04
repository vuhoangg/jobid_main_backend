import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import {PageInfo} from "../../types";

export const Notification = new GraphQLObjectType({
  description: "Represents a notification",
  fields: {
    _id: {type: GraphQLString},
    type: {type: GraphQLString},
    subject: {type: GraphQLString},
    target: {type: GraphQLString},
    message: {type: GraphQLString},
    href: {type: GraphQLString},
    read: {type: GraphQLBoolean},
  },
  name: "Notification"
});

export const NotificationEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of NotificationEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(Notification),
    },
  },
  name: "NotificationEdge",
});

export const NotificationConnection = new GraphQLObjectType({
  description: "List of notifications.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(NotificationEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "NotificationConnection",
});
export const NotificationInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    type: {type: GraphQLString},
    subject: {type: GraphQLString},
    target: {type: GraphQLString},
    message: {type: GraphQLString},
    href: {type: GraphQLString},
    read: {type: GraphQLBoolean},
  },
  name: "NotificationInput",
  description: "The updated properties for a notification.",
});

export const NotificationArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
