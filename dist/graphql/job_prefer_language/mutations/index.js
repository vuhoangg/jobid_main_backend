"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobPreferLanguageMutations = {
    jobPreferLanguageUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobPreferLanguageInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateJobPreferLanguage)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPreferLanguage),
    },
    jobPreferLanguageCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.JobPreferLanguageInput) } },
        resolve: (source, args, context, info) => (0, update_1.createJobPreferLanguage)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPreferLanguage),
    },
};
exports.default = jobPreferLanguageMutations;
//# sourceMappingURL=index.js.map