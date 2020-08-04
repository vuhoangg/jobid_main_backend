"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const candidateQueries = {
    candidate: {
        args: types_2.CandidateArguments,
        resolve: (source, args, context, info) => get_1.getCandidate(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Candidate),
    },
    candidates: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCandidates(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CandidateConnection),
    }
};
exports.default = candidateQueries;
//# sourceMappingURL=index.js.map