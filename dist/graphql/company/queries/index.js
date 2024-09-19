"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const companyQueries = {
    company: {
        args: types_2.CompanyArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompany)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Company),
    },
    companys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanys)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CompanyConnection),
    }
};
exports.default = companyQueries;
//# sourceMappingURL=index.js.map