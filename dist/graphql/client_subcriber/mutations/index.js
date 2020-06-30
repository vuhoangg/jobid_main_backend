"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const clientSubcriberMutations = {
    clientSubcriberUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.ClientSubcriberInput) } },
        resolve: (source, args, context, info) => update_1.updateClientSubcriber(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.ClientSubcriber),
    },
    clientSubcriberCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.ClientSubcriberInput) } },
        resolve: (source, args, context, info) => update_1.createClientSubcriber(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.ClientSubcriber),
    },
};
exports.default = clientSubcriberMutations;
//# sourceMappingURL=index.js.map