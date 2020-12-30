import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
} from "graphql";
import { PageInfo } from "../../types";

export const Admin = new GraphQLObjectType({
    name: "Admin",
    description: "Represents an admin.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        psid: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        birth_day: { type: GraphQLString },
        avatar: { type: GraphQLString },
        gender: { type: GraphQLString },
        login_type: { type: GraphQLString },
        spam: { type: GraphQLInt },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
});

export const AdminEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of AdminEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(Admin),
        },
    },
    name: "AdminEdge",
});

export const AdminConnection = new GraphQLObjectType({
    description: "List of admins.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(AdminEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "AdminConnection",
});

export const AdminInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        psid: { type: GraphQLString },
        birth_day: { type: GraphQLString },
        avatar: { type: GraphQLString },
        gender: { type: GraphQLString },
        spam: { type: GraphQLInt },
    },
    name: "AdminInput",
    description: "The updated properties for an admin.",
});

export const AdminArguments = {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
};
