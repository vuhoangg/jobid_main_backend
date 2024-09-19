"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const cvEmployerQueries = {
    cvEmployer: {
        args: types_2.CvEmployerArguments,
        resolve: (source, args, context, info) => (0, get_1.getCvEmployer)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CvEmployer),
    },
    cvEmployers: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCvEmployers)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CvEmployerConnection),
    },
};
exports.default = cvEmployerQueries;
//# sourceMappingURL=index.js.map