import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";

export const CommunityTag = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        seo_title: { type: GraphQLString },
        seo_description: { type: GraphQLString },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CommunityTag",
});
export const CommunityTagEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityTagEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityTag),
        },
    },
    name: "CommunityTagEdge",
});
export const CommunityTagConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityTagEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityTagConnection",
});

export const CommunityTagInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        seo_title: { type: GraphQLString },
        seo_description: { type: GraphQLString },
    },
    name: "CommunityTagInput",
    description: "The updated properties for a benefit.",
});

export const CommunityTagArguments = {
    _id: { type: GraphQLString },
    slug: { type: GraphQLString },
};
