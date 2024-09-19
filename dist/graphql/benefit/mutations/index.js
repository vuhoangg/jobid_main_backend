"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const benefitMutations = {
    benefitUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.BenefitInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateBenefit)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Benefit),
    },
    benefitCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.BenefitInput) } },
        resolve: (source, args, context, info) => (0, update_1.createBenefit)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Benefit),
    },
};
exports.default = benefitMutations;
//# sourceMappingURL=index.js.map