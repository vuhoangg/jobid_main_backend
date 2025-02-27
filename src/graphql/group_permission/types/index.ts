import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { PageInfo } from "../../types";

export const ActionInput = new GraphQLInputObjectType({
  description: "Represents a action.",
  fields: {
    read: { type: new GraphQLNonNull(GraphQLBoolean) },
    create: { type: new GraphQLNonNull(GraphQLBoolean) },
    update: { type: new GraphQLNonNull(GraphQLBoolean) },
    delete: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  name: "ActionInput",
});

export const Action = new GraphQLObjectType({
  description: "Represents a action.",
  fields: {
    read: { type: GraphQLBoolean },
    create: { type: GraphQLBoolean },
    update: { type: GraphQLBoolean },
    delete: { type: GraphQLBoolean },
  },
  name: "Action",
});

export const PermissionInput = new GraphQLInputObjectType({
  description: "Represents a permission.",
  fields: {
    resource: { type: new GraphQLNonNull(GraphQLString) },
    actions: { type: new GraphQLNonNull(ActionInput) },
  },
  name: "PermissionInput",
});

export const Permission = new GraphQLObjectType({
  description: "Represents a permission.",
  fields: {
    resource: { type: new GraphQLNonNull(GraphQLString) },
    actions: { type: Action },
  },
  name: "Permission",
});

export const GroupPermission = new GraphQLObjectType({
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    company: { type: new GraphQLNonNull(GraphQLString) },
    permission: { type: new GraphQLList(Permission) },
  },
  name: "GroupPermission",
  description: "Represents a group permission.",
});

export const GroupPermissionInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    company: { type: new GraphQLNonNull(GraphQLString) },
    permission: { type: new GraphQLList(PermissionInput) },
  },
  name: "GroupPermissionInput",
  description: "The updated properties for a group permisstion.",
});

export const GroupPermissionEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of GroupPermissionEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(GroupPermission),
    },
  },
  name: "GroupPermissionEdge",
});

export const GroupPermissionConnection = new GraphQLObjectType({
  description: "List of permission.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(GroupPermissionEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "GroupPermissionConnection",
});

export const GroupPermissionArguments = {
  _id: { type: GraphQLString },
  slug: { type: GraphQLString },
};
