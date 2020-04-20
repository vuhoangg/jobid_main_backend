import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobTitle = new GraphQLObjectType({
    description: "Represents a job title.",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "JobTitle",
});
export const JobTitleEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: {type: new GraphQLNonNull(GraphQLString)},
        node: {
            description: "The item at the end of JobTitleEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobTitle),
        },
    },
    name: "JobTitleEdge",
});
export const JobTitleConnection = new GraphQLObjectType({
    description: "List of job titles.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobTitleEdge)),
        },
        pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "JobTitleConnection",
});

export const JobTitleInput = new GraphQLInputObjectType({
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
    },
    name: "JobTitleInput",
    description: "The updated properties for a job title.",
});

export const JobTitleArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};