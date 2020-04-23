"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobLevelMutations = {
    jobLevelUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobLevelInput) } },
        resolve: (source, args, context, info) => update_1.updateJobLevel(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobLevel),
    },
    jobLevelCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobLevelInput) } },
        resolve: (source, args, context, info) => update_1.createJobLevel(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobLevel),
    },
};
exports.default = jobLevelMutations;
//# sourceMappingURL=index.js.map