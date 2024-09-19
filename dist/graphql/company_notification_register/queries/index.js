"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const companyNotificationRegisterQueries = {
    companyNotificationRegister: {
        args: types_2.CompanyNotificationRegisterArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyNotificationRegister)(source, args, context, info),
        type: types_2.CompanyNotificationRegister,
    },
    companyNotificationRegisters: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyNotificationRegisters)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CompanyNotificationRegisterConnection),
    }
};
exports.default = companyNotificationRegisterQueries;
//# sourceMappingURL=index.js.map