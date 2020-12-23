import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import { JobPost } from "../../job_post/types";
import { PageInfo } from "../../types";
import { User } from "../../user/types";

export const JobPostReport = new GraphQLObjectType({
    description: "Represents a job post report.",
    fields: {
        _id: { type: GraphQLString },
        user: { type: User },
        job_post: { type: JobPost },
        reason: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    name: "JobPostReport"
});

export const JobPostReportEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of JobPostReportEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobPostReport),
        },
    },
    name: "JobPostReportEdge"
});

export const JobPostReportConnection = new GraphQLObjectType({
    description: "List of job posts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobPostReportEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "JobPostReportConnection",
});

export const JobPostReportInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        job_post: { type: GraphQLString },
        reason: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    description: "The updated properties for a job post report",
    name: "JobPostReportInput"
});

export const JobPostReportArguments = {
    _id: { type: GraphQLString },
    job_post: { type: GraphQLString },
};
