import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";
import { PageInfo } from "../../types";

export const ServiceWorkerNotification = new GraphQLObjectType({
  description: "Represents a ServiceWorkerNotification.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLString },
    href: { type: GraphQLString },
    tag: { type: GraphQLString },
    icon: { type: GraphQLString },
    badge: { type: GraphQLString },
    image: { type: GraphQLString },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "ServiceWorkerNotification",
});
export const ServiceWorkerNotificationEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of ServiceWorkerNotificationEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(ServiceWorkerNotification),
    },
  },
  name: "ServiceWorkerNotificationEdge",
});
export const ServiceWorkerNotificationConnection = new GraphQLObjectType({
  description: "List of ServiceWorkerNotificationConnections.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(ServiceWorkerNotificationEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "ServiceWorkerNotificationConnection",
});
export const ServiceWorkerNotificationInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLString },
    href: { type: GraphQLString },
    icon: { type: GraphQLString },
    badge: { type: GraphQLString },
    tag: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  name: "ServiceWorkerNotificationInput",
  description: "The updated properties for a ServiceWorkerNotificationInput.",
});

export const ServiceWorkerNotificationArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
