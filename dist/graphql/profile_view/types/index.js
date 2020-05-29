"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileViewArguments = exports.ProfileViewInput = exports.ProfileViewConnection = exports.ProfileViewEdge = exports.ProfileView = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../user/types");
exports.ProfileView = new graphql_1.GraphQLObjectType({
    description: "Represents a profile view.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_hunter: { type: types_2.User },
        user_profile: { type: types_2.User },
        view_count: { type: graphql_1.GraphQLInt },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "ProfileView",
});
exports.ProfileViewEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of ProfileViewEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.ProfileView),
        },
    },
    name: "ProfileViewEdge",
});
exports.ProfileViewConnection = new graphql_1.GraphQLObjectType({
    description: "List of profile views.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.ProfileViewEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "ProfileViewConnection",
});
exports.ProfileViewInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        user_profile: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "ProfileViewInput",
    description: "The updated properties for a profile view.",
});
exports.ProfileViewArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map