"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const userQueries = {
    user: {
        args: types_2.UserArguments,
        resolve: (source, args, context, info) => (0, get_1.getUser)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.User),
    },
    users: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getUsers)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.UserConnection),
    }
};
exports.default = userQueries;
//# sourceMappingURL=index.js.map