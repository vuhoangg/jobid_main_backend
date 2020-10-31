import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { User } from "../../user/types";
import { PageInfo } from "../../types";
import { CommunityPost } from "../../community_post/types";

export const CommunityPostLike = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: User },
        community_post: { type: CommunityPost },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CommunityPostLike",
});
export const CommunityPostLikeEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostLikeEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityPostLike),
        },
    },
    name: "CommunityPostLikeEdge",
});
export const CommunityPostLikeConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityPostLikeEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityPostLikeConnection",
});

export const CommunityPostLikeInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        user: { type: GraphQLString },
        community_post: { type: GraphQLString },
    },
    name: "CommunityPostLikeInput",
    description: "The updated properties for a benefit.",
});

export const CommunityPostLikeArguments = {
    _id: { type: GraphQLString },
    slug: { type: GraphQLString },
};
