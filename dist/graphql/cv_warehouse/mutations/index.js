"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const types_1 = require("../types");
const cvWarehouseMutations = {
    cvWarehouseUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CvWarehouseInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateCvWarehouse)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CvWarehouse),
    },
    cvWarehouseCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CvWarehouseInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCvWarehouse)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CvWarehouse),
    },
};
exports.default = cvWarehouseMutations;
//# sourceMappingURL=index.js.map