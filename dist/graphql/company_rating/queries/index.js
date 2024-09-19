"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const companyRatingQueries = {
    companyRating: {
        args: types_2.CompanyRatingArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyRating)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CompanyRating),
    },
    companyRatings: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCompanyRatings)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CompanyRatingConnection),
    }
};
exports.default = companyRatingQueries;
//# sourceMappingURL=index.js.map