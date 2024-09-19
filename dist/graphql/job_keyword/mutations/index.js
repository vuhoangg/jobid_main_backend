"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobKeywordMutations = {
    jobKeywordUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobKeywordInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateJobKeyword)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobKeyword),
    },
    jobKeywordCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobKeywordInput) } },
        resolve: (source, args, context, info) => (0, update_1.createJobKeyword)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobKeyword),
    },
};
exports.default = jobKeywordMutations;
//# sourceMappingURL=index.js.map