"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const cityMutations = {
    city: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CityInput) } },
        resolve: (source, args, context) => (0, update_1.updateCity)(args, context),
        type: new graphql_1.GraphQLNonNull(types_1.City),
    },
};
exports.default = cityMutations;
//# sourceMappingURL=index.js.map