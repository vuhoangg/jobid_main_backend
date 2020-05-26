"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyFollowArguments = exports.CompanyFollowInput = exports.CompanyFollowConnection = exports.CompanyFollowEdge = exports.CompanyFollow = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
const types_3 = require("../../job_post/types");
exports.CompanyFollow = new graphql_1.GraphQLObjectType({
    description: "Represents a company follow.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_post: { type: types_3.JobPost },
        user: { type: types_2.User },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyFollow",
});
exports.CompanyFollowEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CompanyFollowEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CompanyFollow),
        },
    },
    name: "CompanyFollowEdge",
});
exports.CompanyFollowConnection = new graphql_1.GraphQLObjectType({
    description: "List of company follows.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CompanyFollowEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CompanyFollowConnection",
});
exports.CompanyFollowInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        job_post: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "CompanyFollowInput",
    description: "The updated properties for a company follow.",
});
exports.CompanyFollowArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map