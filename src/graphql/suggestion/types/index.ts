import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const Suggestion = new GraphQLObjectType({
    description: "Represents a suggestion.",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "Suggestion",
});
export const SuggestionEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: {type: new GraphQLNonNull(GraphQLString)},
        node: {
            description: "The item at the end of SuggestionEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(Suggestion),
        },
    },
    name: "SuggestionEdge",
});
export const SuggestionConnection = new GraphQLObjectType({
    description: "List of suggestions.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(SuggestionEdge)),
        },
        pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "SuggestionConnection",
});

export const SuggestionInput = new GraphQLInputObjectType({
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
    },
    name: "SuggestionInput",
    description: "The updated properties for a suggestion.",
});

export const SuggestionArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};