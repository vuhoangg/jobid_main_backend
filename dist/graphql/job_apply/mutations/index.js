"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const types_1 = require("../types");
const jobApplyMutations = {
    jobApplyCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyInput) } },
        resolve: (source, args, context, info) => update_1.createJobApply(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApply),
    },
    employerJobApplyUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyInput) } },
        resolve: (source, args, context, info) => update_1.employerUpdateJobApply(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApply),
    },
};
exports.default = jobApplyMutations;
//# sourceMappingURL=index.js.map