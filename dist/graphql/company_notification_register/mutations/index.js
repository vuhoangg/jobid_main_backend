"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const companyNotificationRegisterMutations = {
    companyNotificationRegisterCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyNotificationRegisterInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCompanyNotificationRegister)(source, args, context, info),
        type: types_1.CompanyNotificationRegister,
    },
    companyNotificationRegisterDelete: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyNotificationRegisterInput) } },
        resolve: (source, args, context, info) => (0, update_1.deleteCompanyNotificationRegister)(source, args, context, info),
        type: types_1.CompanyNotificationRegister,
    },
};
exports.default = companyNotificationRegisterMutations;
//# sourceMappingURL=index.js.map