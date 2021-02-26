"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const FacebookEmployer = new graphql_1.GraphQLObjectType({
    description: "Represents a facebook employer.",
    fields: {
        avatar: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
    name: "FacebookEmployer"
});
const FacebookEmployerInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a facebook employer.",
    fields: {
        avatar: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
    name: "FacebookEmployerInput"
});
const FacebookAddress = new graphql_1.GraphQLObjectType({
    description: "Represents a facebook address.",
    fields: {
        text: { type: graphql_1.GraphQLString },
    },
    name: "FacebookAddress"
});
const FacebookAddressInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a facebook address.",
    fields: {
        text: { type: graphql_1.GraphQLString },
    },
    name: "FacebookAddressInput"
});
const FacebookMap = new graphql_1.GraphQLObjectType({
    description: "Represents a facebook map.",
    fields: {
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "FacebookMap"
});
const FacebookMapInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a facebook map.",
    fields: {
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "FacebookMapInput"
});
exports.FacebookJob = new graphql_1.GraphQLObjectType({
    description: "Represents a facebook job.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        employer: { type: FacebookEmployer },
        address: { type: FacebookAddress },
        long_description: { type: graphql_1.GraphQLString },
        share_url: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        sub_title: { type: graphql_1.GraphQLString },
        map: { type: FacebookMap },
    },
    name: "FacebookJob"
});
exports.FacebookJobEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "FacebookJobEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.FacebookJob),
        },
    },
    name: "FacebookJobEdge",
});
exports.FacebookJobConnection = new graphql_1.GraphQLObjectType({
    description: "List of facebookJobs.",
    fields: {
        edges: {
            description: "FacebookJobConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.FacebookJobEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "FacebookJobConnection",
});
exports.FacebookJobInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a facebook job.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        employer: { type: FacebookEmployerInput },
        address: { type: FacebookAddressInput },
        long_description: { type: graphql_1.GraphQLString },
        share_url: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        sub_title: { type: graphql_1.GraphQLString },
        map: { type: FacebookMapInput },
    },
    name: "FacebookJobInput"
});
exports.FacebookJobArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map