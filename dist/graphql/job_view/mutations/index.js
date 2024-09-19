"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobViewMutations = {
    jobViewUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobViewInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateJobView)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobView),
    },
};
exports.default = jobViewMutations;
//# sourceMappingURL=index.js.map