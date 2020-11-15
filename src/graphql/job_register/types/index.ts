import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";

export const JobRegister = new GraphQLObjectType({
    description: "Represents a job register.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        contact_name: { type: new GraphQLNonNull(GraphQLString) },
        job_title: { type: new GraphQLNonNull(GraphQLString) },
        job_location: { type: new GraphQLNonNull(GraphQLString) },
        contact_phone: { type: new GraphQLNonNull(GraphQLString) },
        contact_email: { type: GraphQLString },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "JobRegister",
});
export const JobRegisterEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of JobRegisterEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobRegister),
        },
    },
    name: "JobRegisterEdge",
});
export const JobRegisterConnection = new GraphQLObjectType({
    description: "List of job registers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobRegisterEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "JobRegisterConnection",
});

export const JobRegisterInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        contact_name: { type: new GraphQLNonNull(GraphQLString) },
        job_title: { type: new GraphQLNonNull(GraphQLString) },
        job_location: { type: new GraphQLNonNull(GraphQLString) },
        contact_phone: { type: new GraphQLNonNull(GraphQLString) },
        contact_email: { type: GraphQLString },
    },
    name: "JobRegisterInput",
    description: "The updated properties for a job register.",
});

export const JobRegisterArguments = {
    _id: { type: new GraphQLNonNull(GraphQLString) },
};
