"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_level/types");
exports.UserCustomizeInfo = new graphql_1.GraphQLObjectType({
    description: "Represents an user customize info.",
    fields: {
        cover: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        files: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        current_job_title: { type: graphql_1.GraphQLString },
        current_job_level: { type: types_2.JobLevel },
        current_experience_number: { type: graphql_1.GraphQLInt },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        nation: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "UserCustomizeInfo",
});
exports.UserCustomizeInfoInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user customize info.",
    fields: {
        cover: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        files: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        current_job_title: { type: graphql_1.GraphQLString },
        current_job_level: { type: graphql_1.GraphQLString },
        current_experience_number: { type: graphql_1.GraphQLInt },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        nation: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "UserCustomizeInfoInput",
});
exports.User = new graphql_1.GraphQLObjectType({
    description: "Represents an user.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfo },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "User",
});
exports.UserEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of UserEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.User),
        },
    },
    name: "UserEdge",
});
exports.UserConnection = new graphql_1.GraphQLObjectType({
    description: "List of users.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.UserEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "UserConnection",
});
exports.UserInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfoInput },
    },
    name: "UserInput",
    description: "The updated properties for an user.",
});
exports.UserArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map