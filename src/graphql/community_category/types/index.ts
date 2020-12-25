import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";

export const CommunityCategory = new GraphQLObjectType({
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
    name: "CommunityCategory",
});
export const CommunityCategoryEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CommunityCategoryEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CommunityCategory),
        },
    },
    name: "CommunityCategoryEdge",
});
export const CommunityCategoryConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CommunityCategoryEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CommunityCategoryConnection",
});

export const CommunityCategoryInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        seo_title: { type: GraphQLString },
        seo_description: { type: GraphQLString },
    },
    name: "CommunityCategoryInput",
    description: "The updated properties for a benefit.",
});

export const CommunityCategoryArguments = {
    _id: { type: GraphQLString },
    slug: { type: GraphQLString },
};
