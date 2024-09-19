"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const get_1 = require("../resolvers/get");
const types_1 = require("../types");
const logoutQueries = {
    logout: {
        resolve: (source, args, context, info) => (0, get_1.logout)(args, context),
        type: new graphql_1.GraphQLNonNull(types_1.LogoutType),
    },
};
exports.default = logoutQueries;
//# sourceMappingURL=index.js.map