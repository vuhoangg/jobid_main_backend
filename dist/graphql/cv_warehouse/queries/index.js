"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const cvWarehouseQueries = {
    cvWarehouse: {
        args: types_2.CvWarehouseArguments,
        resolve: (source, args, context, info) => (0, get_1.getCvWarehouse)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CvWarehouse),
    },
    cvWarehouses: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCvWarehouses)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CvWarehouseConnection),
    },
};
exports.default = cvWarehouseQueries;
//# sourceMappingURL=index.js.map