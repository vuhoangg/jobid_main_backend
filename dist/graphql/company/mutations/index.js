"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const companyMutations = {
    companyUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyInput) } },
        resolve: (source, args, context, info) => update_1.updateCompany(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Company),
    },
    companyCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyInput) } },
        resolve: (source, args, context, info) => update_1.createCompany(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Company),
    },
    assignPermission: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.AssignPermissionInput) } },
        resolve: (source, args, context, info) => update_1.assignPermission(source, args, context, info),
        type: types_1.AssignPermissionOnput,
    },
    companyVerifyUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyInput) } },
        resolve: (source, args, context, info) => update_1.verifyCompany(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Company),
    },
    companyPremiumUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyInput) } },
        resolve: (source, args, context, info) => update_1.premiumCompany(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Company),
    },
};
exports.default = companyMutations;
//# sourceMappingURL=index.js.map