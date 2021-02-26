"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../employer/types");
exports.CvWarehouse = new graphql_1.GraphQLObjectType({
    description: "Represents a cv warehouse.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        employer: { type: types_2.Employer },
        thumnail: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        access: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "CvWarehouse",
});
exports.CvWarehouseEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "CvWarehouseEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CvWarehouse),
        },
    },
    name: "CvWarehouseEdge",
});
exports.CvWarehouseConnection = new graphql_1.GraphQLObjectType({
    description: "List of cv warehouses.",
    fields: {
        edges: {
            description: "CvWarehouseConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CvWarehouseEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CvWarehouseConnection",
});
exports.CvWarehouseInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a cv warehouse.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        employer: { type: graphql_1.GraphQLString },
        thumnail: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        access: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "CvWarehouseInput",
});
exports.CvWarehouseArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map