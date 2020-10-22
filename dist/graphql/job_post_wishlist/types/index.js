"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostWishlistArguments = exports.JobPostWishlistInput = exports.JobPostWishlistConnection = exports.JobPostWishlistEdge = exports.JobPostWishlist = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../job_post/types");
const types_2 = require("../../types");
const types_3 = require("../../user/types");
exports.JobPostWishlist = new graphql_1.GraphQLObjectType({
    description: "Represents a job post wish list.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: types_3.User },
        job_post: { type: types_1.JobPost },
    },
    name: "JobPostWishlist"
});
exports.JobPostWishlistEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobPostWishlistEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobPostWishlist),
        },
    },
    name: "JobPostWishlistEdge"
});
exports.JobPostWishlistConnection = new graphql_1.GraphQLObjectType({
    description: "List of job posts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobPostWishlistEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "JobPostWishlistConnection",
});
exports.JobPostWishlistInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        job_post: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for a job post wish list",
    name: "JobPostWishlistInput"
});
exports.JobPostWishlistArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map