"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobApplyMutations = {
    jobApplyUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobApplyInput) } },
        resolve: (source, args, context, info) => update_1.updateJobApply(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobApply),
    },
};
exports.default = jobApplyMutations;
//# sourceMappingURL=index.js.map