"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const get_1 = require("../resolvers/get");
const types_1 = require("../types");
const coordinateQueries = {
    coordinateText: {
        args: types_1.CoordinateTextArgument,
        resolve: (source, args, context, info) => (0, get_1.getCoordinatesFromText)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CoordinateConnection),
    },
    coordinateLatLong: {
        args: types_1.CoordinateLatLongArgument,
        resolve: (source, args, context, info) => (0, get_1.getCoordinatesFromLatLong)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CoordinateConnection),
    },
};
exports.default = coordinateQueries;
//# sourceMappingURL=index.js.map