"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const companyFeatureMutations = {
    companyFeatureUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyFeatureInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateCompanyFeature)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CompanyFeature),
    },
    companyFeatureCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CompanyFeatureInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCompanyFeature)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CompanyFeature),
    },
};
exports.default = companyFeatureMutations;
//# sourceMappingURL=index.js.map