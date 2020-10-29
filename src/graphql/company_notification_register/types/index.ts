import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { JobPost } from "../../job_post/types";
import { Company } from "../../company/types";

export const CompanyNotificationRegister = new GraphQLObjectType({
    description: "Represents a company notification register.",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        company: { type: Company },
        user: { type: User },
        created_at: { type: new GraphQLNonNull(GraphQLString) },
        updated_at: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CompanyNotificationRegister",
});
export const CompanyNotificationRegisterEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of CompanyNotificationRegisterEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(CompanyNotificationRegister),
        },
    },
    name: "CompanyNotificationRegisterEdge",
});
export const CompanyNotificationRegisterConnection = new GraphQLObjectType({
    description: "List of company notification registers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(CompanyNotificationRegisterEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CompanyNotificationRegisterConnection",
});

export const CompanyNotificationRegisterInput = new GraphQLInputObjectType({
    fields: {
        company: { type: new GraphQLNonNull(GraphQLString) },
    },
    name: "CompanyNotificationRegisterInput",
    description: "The updated properties for a company notification register.",
});

export const CompanyNotificationRegisterArguments = {
    _id: { type: GraphQLString },
    company: { type: GraphQLString }
};
