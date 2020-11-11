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

export const Employer = new GraphQLObjectType({
    name: "Employer",
    description: "Represents an employer.",
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
        info: { type: EmployerInfo },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
});

export const EmployerEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of EmployerEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(Employer),
        },
    },
    name: "EmployerEdge",
});

export const EmployerConnection = new GraphQLObjectType({
    description: "List of employers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(EmployerEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "EmployerConnection",
});

export const EmployerInput = new GraphQLInputObjectType({
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
    name: "EmployerInput",
    description: "The updated properties for an employer.",
});

export const EmployerArguments = {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
};