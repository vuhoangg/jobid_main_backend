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

export const CommunityAnswer = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: User },
        question: { type: GraphQLString },
        reply: { type: GraphQLString },
        description: { type: GraphQLString },
        like_count: { type: GraphQLInt },
        reply_count: { type: GraphQLInt },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CommunityAnswer",
});
export const CommunityAnswerEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityAnswerEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityAnswer),
        },
    },
    name: "CommunityAnswerEdge",
});
export const CommunityAnswerConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityAnswerEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityAnswerConnection",
});

export const CommunityAnswerInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        question: { type: GraphQLString },
        reply: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    name: "CommunityAnswerInput",
    description: "The updated properties for a benefit.",
});

export const CommunityAnswerArguments = {
    _id: { type: GraphQLString },
};
