"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobApplyOrtherMutations = {
    jobApplyOrtherUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyOrtherInput) } },
        resolve: (source, args, context, info) => update_1.updateJobApplyOrther(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApplyOrther),
    },
    jobStatusApplyOrtherUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyOrtherInput) } },
        resolve: (source, args, context, info) => update_1.updateStatusJobApplyOrther(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApplyOrther),
    },
};
exports.default = jobApplyOrtherMutations;
//# sourceMappingURL=index.js.map