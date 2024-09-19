"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const companyFollowQueries = {
    companyFollow: {
        args: types_2.CompanyFollowArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyFollow)(source, args, context, info),
        type: types_2.CompanyFollow,
    },
    companyFollows: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyFollows)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CompanyFollowConnection),
    }
};
exports.default = companyFollowQueries;
//# sourceMappingURL=index.js.map