"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRatingArguments = exports.CompanyRatingInput = exports.CompanyRatingConnection = exports.CompanyRatingEdge = exports.CompanyRating = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.CompanyRating = new graphql_1.GraphQLObjectType({
    description: "Represents a company rating reply.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: types_2.User },
        company: { type: graphql_1.GraphQLString },
        rat_value: { type: graphql_1.GraphQLInt },
        rat_comment: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "CompanyRating",
});
exports.CompanyRatingEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CompanyRatingEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CompanyRating),
        },
    },
    name: "CompanyRatingEdge",
});
exports.CompanyRatingConnection = new graphql_1.GraphQLObjectType({
    description: "List of company ratings.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CompanyRatingEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CompanyRatingConnection",
});
exports.CompanyRatingInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        user: { type: graphql_1.GraphQLString },
        company: { type: graphql_1.GraphQLString },
        rat_value: { type: graphql_1.GraphQLInt },
        rat_comment: { type: graphql_1.GraphQLString },
    },
    name: "CompanyRatingInput",
    description: "The updated properties for a company rating input.",
});
exports.CompanyRatingArguments = {
    _id: { type: graphql_1.GraphQLString },
    company: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map