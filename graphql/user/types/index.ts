import {
    GraphQLInputObjectType, GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const User = new GraphQLObjectType({
    description: "Represents a user.",
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
        _id: {type: new GraphQLNonNull(GraphQLString)},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        birth_day: {type: GraphQLString},
        avatar: {type: GraphQLString},
        gender: {type: GraphQLString},
        login_type: {type: GraphQLString},
        spam: {type: GraphQLInt},
    },
    name: "UserInput",
    description: "The updated properties for a user.",
});

export const UserArguments = {
    _id: {type: GraphQLString},
};