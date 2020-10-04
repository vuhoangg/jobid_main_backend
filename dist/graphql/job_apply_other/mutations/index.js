"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobApplyOtherMutations = {
    jobApplyOtherUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyOtherInput) } },
        resolve: (source, args, context, info) => update_1.updateJobApplyOther(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApplyOther),
    },
    jobStatusApplyOtherUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyOtherInput) } },
        resolve: (source, args, context, info) => update_1.updateStatusJobApplyOther(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApplyOther),
    },
};
exports.default = jobApplyOtherMutations;
//# sourceMappingURL=index.js.map