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

export const JobPostWishlist = new GraphQLObjectType({
    description: "Represents a job post wish list.",
    fields: {
        _id: { type: GraphQLString },
        user: { type: User },
        job_post: { type: JobPost },
    },
    name: "JobPostWishlist"
});

export const JobPostWishlistEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new GraphQLNonNull(GraphQLString) },
        node: {
            description: "The item at the end of JobPostWishlistEdge.",
            resolve: (parent) => parent.node,
            type: new GraphQLNonNull(JobPostWishlist),
        },
    },
    name: "JobPostWishlistEdge"
});

export const JobPostWishlistConnection = new GraphQLObjectType({
    description: "List of job posts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new GraphQLNonNull(new GraphQLList(JobPostWishlistEdge)),
        },
        pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "JobPostWishlistConnection",
});

export const JobPostWishlistInput = new GraphQLInputObjectType({
    fields: {
        _id: { type: GraphQLString },
        user: { type: GraphQLString },
        job_post: { type: GraphQLString },
    },
    description: "The updated properties for a job post wish list",
    name: "JobPostWishlistInput"
});

export const JobPostWishlistArguments = {
    _id: { type: GraphQLString },
    job_post: { type: GraphQLString },
};
