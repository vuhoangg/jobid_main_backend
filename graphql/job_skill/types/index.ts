import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const JobSkill = new GraphQLObjectType({
    description: "Represents a job skill.",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "JobSkill",
});
export const JobSkillEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: {type: new GraphQLNonNull(GraphQLString)},
        node: {
            description: "The item at the end of JobSkillEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobSkill),
        },
    },
    name: "JobSkillEdge",
});
export const JobSkillConnection = new GraphQLObjectType({
    description: "List of job skills.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobSkillEdge)),
        },
        pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "JobSkillConnection",
});

export const JobSkillInput = new GraphQLInputObjectType({
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        seo_title: {type: GraphQLString},
        seo_description: {type: GraphQLString},
    },
    name: "JobSkillInput",
    description: "The updated properties for a job skill.",
});

export const JobSkillArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};