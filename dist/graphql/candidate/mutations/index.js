"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const candidateMutations = {
    candidateUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CandidateInput) } },
        resolve: (source, args, context, info) => update_1.updateCandidate(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Candidate),
    },
    candidateCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CandidateInput) } },
        resolve: (source, args, context, info) => update_1.createCandidate(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Candidate),
    },
};
exports.default = candidateMutations;
//# sourceMappingURL=index.js.map