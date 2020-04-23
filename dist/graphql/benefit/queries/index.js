"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const benefitQueries = {
    benefit: {
        args: types_2.BenefitArguments,
        resolve: (source, args, context, info) => get_1.getBenefit(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Benefit),
    },
    benefits: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getBenefits(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.BenefitConnection),
    }
};
exports.default = benefitQueries;
//# sourceMappingURL=index.js.map