"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const get_1 = require("../resolvers/get");
const types_1 = require("../types");
const distanceBoundQueries = {
    distanceBound: {
        args: types_1.DistanceBoundArgument,
        resolve: (source, args, context, info) => get_1.getDistanceBound(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.DistanceBoundType),
    },
};
exports.default = distanceBoundQueries;
//# sourceMappingURL=index.js.map