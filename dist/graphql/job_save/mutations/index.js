"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobSaveMutations = {
    jobSaveUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobSaveInput) } },
        resolve: (source, args, context, info) => update_1.updateJobSave(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobSave),
    },
};
exports.default = jobSaveMutations;
//# sourceMappingURL=index.js.map