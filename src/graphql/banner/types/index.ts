import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";

export const Banner = new GraphQLObjectType({
    description: "Represents a banner.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        href: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "Banner",
});
export const BannerEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of BannerEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(Banner),
        },
    },
    name: "BannerEdge",
});
export const BannerConnection = new GraphQLObjectType({
    description: "List of banners.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(BannerEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "BannerConnection",
});

export const BannerInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        href: { type: GraphQLString },
        status: { type: GraphQLString },
    },
    name: "BannerInput",
    description: "The updated properties for a banner.",
});

export const BannerArguments = {
    _id: { type: new GraphQLNonNull(GraphQLString) },
};
