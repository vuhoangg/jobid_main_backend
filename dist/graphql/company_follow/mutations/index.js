"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const companyFollowMutations = {
    companyFollowCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyFollowInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCompanyFollow)(source, args, context, info),
        type: types_1.CompanyFollow,
    },
    companyFollowDelete: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyFollowInput) } },
        resolve: (source, args, context, info) => (0, update_1.deleteCompanyFollow)(source, args, context, info),
        type: types_1.CompanyFollow,
    },
};
exports.default = companyFollowMutations;
//# sourceMappingURL=index.js.map