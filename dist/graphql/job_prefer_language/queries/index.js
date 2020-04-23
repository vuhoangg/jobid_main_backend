"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobPreferLanguageQueries = {
    jobPreferLanguage: {
        args: types_2.JobPreferLanguageArguments,
        resolve: (source, args, context, info) => get_1.getJobPreferLanguage(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPreferLanguage),
    },
    jobPreferLanguages: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobPreferLanguages(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPreferLanguageConnection),
    }
};
exports.default = jobPreferLanguageQueries;
//# sourceMappingURL=index.js.map