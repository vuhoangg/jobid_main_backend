import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobLocation = new GraphQLObjectType({
    description: "Represents a job location.",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "JobLocation",
});
export const JobLocationEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: {type: new GraphQLNonNull(GraphQLString)},
        node: {
            description: "The item at the end of JobLocationEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobLocation),
        },
    },
    name: "JobLocationEdge",
});
export const JobLocationConnection = new GraphQLObjectType({
    description: "List of job categories.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobLocationEdge)),
        },
        pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "JobLocationConnection",
});

export const JobLocationInput = new GraphQLInputObjectType({
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
    },
    name: "JobLocationInput",
    description: "The updated properties for a job location.",
});

export const JobLocationArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};