"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const wardMutations = {
    ward: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.WardInput) } },
        resolve: (source, args, context) => update_1.updateWard(args, context),
        type: new graphql_1.GraphQLNonNull(types_1.Ward),
    },
};
exports.default = wardMutations;
//# sourceMappingURL=index.js.map