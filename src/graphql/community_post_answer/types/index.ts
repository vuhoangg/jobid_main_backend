import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { User } from "../../user/types";
import { PageInfo } from "../../types";

export const CommunityPostAnswer = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: User },
        community_post: { type: GraphQLString },
        reply: { type: GraphQLString },
        description: { type: GraphQLString },
        like_count: { type: GraphQLInt },
        reply_count: { type: GraphQLInt },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CommunityPostAnswer",
});
export const CommunityPostAnswerEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostAnswerEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityPostAnswer),
        },
    },
    name: "CommunityPostAnswerEdge",
});
export const CommunityPostAnswerConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityPostAnswerEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityPostAnswerConnection",
});

export const CommunityPostAnswerInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        community_post: { type: GraphQLString },
        reply: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    name: "CommunityPostAnswerInput",
    description: "The updated properties for a benefit.",
});

export const CommunityPostAnswerArguments = {
    _id: { type: GraphQLString },
};
