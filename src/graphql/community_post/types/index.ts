import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import { User } from "../../user/types";
import { PageInfo } from "../../types";
import { CommunityCategory } from "../../community_category/types";
import { CommunityTag } from "../../community_tag/types";

export const CommunityPost = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: User },
        title: { type: GraphQLString },
        community_category: { type: CommunityCategory },
        slug: { type: GraphQLString },
        community_tag: { type: new GraphQLList(CommunityTag) },
        description: { type: GraphQLString },
        like_count: { type: GraphQLInt },
        is_like: { type: GraphQLBoolean },
        view_count: { type: GraphQLInt },
        answer_count: { type: GraphQLInt },
        status: { type: GraphQLString },
        seo_title: { type: GraphQLString },
        seo_description: { type: GraphQLString },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CommunityPost",
});
export const CommunityPostEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityPostEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityPost),
        },
    },
    name: "CommunityPostEdge",
});
export const CommunityPostConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityPostEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityPostConnection",
});

export const CommunityPostInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        user: { type: GraphQLString },
        title: { type: GraphQLString },
        community_category: { type: GraphQLString },
        community_tag: { type: new GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
    },
    name: "CommunityPostInput",
    description: "The updated properties for a benefit.",
});

export const CommunityPostTrackingBySlug = new GraphQLObjectType({
    fields: {
        status: { type: GraphQLBoolean },
    },
    name: "CommunityPostTrackingBySlug",
    description: "Represents a community post tracking"
})

export const CommunityPostTrackingBySlugInput = new GraphQLInputObjectType({
    fields: {
        slug: { type: GraphQLString },
    },
    name: "CommunityPostTrackingBySlugInput",
    description: "The updated properties for a community post tracking."
});

export const CommunityPostArguments = {
    _id: { type: GraphQLString },
    slug: { type: GraphQLString },
};
