"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobTypeMutations = {
    jobTypeUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobTypeInput) } },
        resolve: (source, args, context, info) => update_1.updateJobType(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobType),
    },
    jobTypeCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobTypeInput) } },
        resolve: (source, args, context, info) => update_1.createJobType(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobType),
    },
};
exports.default = jobTypeMutations;
//# sourceMappingURL=index.js.map