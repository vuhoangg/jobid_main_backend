"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const wardQueries = {
    ward: {
        args: types_2.WardArguments,
        resolve: (source, args, context, info) => (0, get_1.getWard)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Ward),
    },
    wards: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getWards)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.WardConnection),
    },
};
exports.default = wardQueries;
//# sourceMappingURL=index.js.map