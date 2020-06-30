"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const clientSubcriberQueries = {
    clientSubcriber: {
        args: types_2.ClientSubcriberArguments,
        resolve: (source, args, context, info) => get_1.getClientSubcriber(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ClientSubcriber),
    },
    clientSubcribers: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getClientSubcribers(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ClientSubcriberConnection),
    }
};
exports.default = clientSubcriberQueries;
//# sourceMappingURL=index.js.map