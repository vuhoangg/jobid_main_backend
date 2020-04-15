import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const Benefit = new GraphQLObjectType({
    description: "Represents a benefit.",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "Benefit",
});
export const BenefitEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: {type: new GraphQLNonNull(GraphQLString)},
        node: {
            description: "The item at the end of BenefitEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(Benefit),
        },
    },
    name: "BenefitEdge",
});
export const BenefitConnection = new GraphQLObjectType({
    description: "List of benefits.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(BenefitEdge)),
        },
        pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "BenefitConnection",
});

export const BenefitInput = new GraphQLInputObjectType({
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
    },
    name: "BenefitInput",
    description: "The updated properties for a benefit.",
});

export const BenefitArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};