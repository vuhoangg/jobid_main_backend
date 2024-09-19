"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobTitleMutations = {
    jobTitleUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobTitleInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateJobTitle)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobTitle),
    },
    jobTitleCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobTitleInput) } },
        resolve: (source, args, context, info) => (0, update_1.createJobTitle)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobTitle),
    },
};
exports.default = jobTitleMutations;
//# sourceMappingURL=index.js.map