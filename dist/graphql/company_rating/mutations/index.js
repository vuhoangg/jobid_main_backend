"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const types_1 = require("../types");
const companyRatingMutations = {
    companyRatingCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyRatingInput) } },
        resolve: (source, args, context, info) => update_1.createJobRating(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CompanyRating),
    },
};
exports.default = companyRatingMutations;
//# sourceMappingURL=index.js.map