"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSubcriberArguments = exports.ClientSubcriberInput = exports.ClientSubcriberConnection = exports.ClientSubcriberEdge = exports.ClientSubcriber = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.ClientSubcriber = new graphql_1.GraphQLObjectType({
    description: "Represents a ClientSubcriber.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        clientId: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        browser: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "ClientSubcriber",
});
exports.ClientSubcriberEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of ClientSubcriberEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.ClientSubcriber),
        },
    },
    name: "ClientSubcriberEdge",
});
exports.ClientSubcriberConnection = new graphql_1.GraphQLObjectType({
    description: "List of ClientSubcribers.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.ClientSubcriberEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "ClientSubcriberConnection",
});
exports.ClientSubcriberInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        clientId: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        browser: { type: graphql_1.GraphQLString }
    },
    name: "ClientSubcriberInput",
    description: "The updated properties for a ClientSubcriberInput.",
});
exports.ClientSubcriberArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map