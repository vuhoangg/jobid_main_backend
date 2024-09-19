"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const get_1 = require("../resolvers/get");
const types_1 = require("../types");
const websiteRoleQueries = {
    websiteRole: {
        args: types_1.RoleArgument,
        resolve: (source, args, context, info) => (0, get_1.getWebsiteRole)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.WebsiteRole),
    },
};
exports.default = websiteRoleQueries;
//# sourceMappingURL=index.js.map