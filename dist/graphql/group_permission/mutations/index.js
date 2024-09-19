"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const groupPermissionMutations = {
    groupPermissionUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.GroupPermissionInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateGroupPermission)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.GroupPermission),
    },
    groupPermissionCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.GroupPermissionInput) } },
        resolve: (source, args, context, info) => (0, update_1.createGroupPermission)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.GroupPermission),
    },
};
exports.default = groupPermissionMutations;
//# sourceMappingURL=index.js.map