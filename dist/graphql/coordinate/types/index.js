"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinateLatLongArgument = exports.CoordinateTextArgument = exports.CoordinateConnection = exports.CoordinateEdge = exports.CoordinateType = void 0;
const graphql_1 = require("graphql");
exports.CoordinateType = new graphql_1.GraphQLObjectType({
    description: "CoordinateType",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        latitude: { type: graphql_1.GraphQLFloat },
        longitude: { type: graphql_1.GraphQLFloat },
        text: { type: graphql_1.GraphQLString },
        city: { type: graphql_1.GraphQLString },
        district: { type: graphql_1.GraphQLString },
        ward: { type: graphql_1.GraphQLString },
        street: { type: graphql_1.GraphQLString },
        house_number: { type: graphql_1.GraphQLString },
    },
    name: "CoordinateType",
});
exports.CoordinateEdge = new graphql_1.GraphQLObjectType({
    description: "Coordinate edge resources",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "CoordinateEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CoordinateType),
        },
    },
    name: "CoordinateEdge",
});
exports.CoordinateConnection = new graphql_1.GraphQLObjectType({
    fields: {
        edges: {
            description: "CoordinateConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CoordinateEdge)),
        },
    },
    name: "CoordinateConnection",
});
exports.CoordinateTextArgument = {
    text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.CoordinateLatLongArgument = {
    latitude: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
    longitude: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
};
//# sourceMappingURL=index.js.map