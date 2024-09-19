"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const index_1 = require("../types/index");
const curriculumVitaeQueries = {
    curriculumVitae: {
        args: index_1.CurriculumVitaeArguments,
        resolve: (source, args, context, info) => (0, get_1.getCurriculumVitae)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(index_1.CurriculumVitae),
    },
    curriculumVitaes: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCurriculumVitaes)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(index_1.CurriculumVitaeConnection),
    },
};
exports.default = curriculumVitaeQueries;
//# sourceMappingURL=index.js.map