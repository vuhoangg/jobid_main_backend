"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const companyFollowMutations = {
    companyFollowUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CompanyFollowInput) } },
        resolve: (source, args, context, info) => update_1.updateCompanyFollow(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CompanyFollow),
    },
};
exports.default = companyFollowMutations;
//# sourceMappingURL=index.js.map