"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const groupPermissionQueries = {
    groupPermission: {
        args: types_2.GroupPermissionArguments,
        resolve: (source, args, context, info) => get_1.getGroupPermission(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.GroupPermission),
    },
    groupPermissions: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getGroupPermissions(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.GroupPermissionConnection),
    },
};
exports.default = groupPermissionQueries;
//# sourceMappingURL=index.js.map