"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobLocationMutations = {
    jobLocationUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobLocationInput) } },
        resolve: (source, args, context, info) => update_1.updateJobLocation(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobLocation),
    },
    jobLocationCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobLocationInput) } },
        resolve: (source, args, context, info) => update_1.createJobLocation(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobLocation),
    },
};
exports.default = jobLocationMutations;
//# sourceMappingURL=index.js.map