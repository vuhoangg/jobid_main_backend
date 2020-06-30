"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const CurriculumVitaeMutations = {
    curriculumVitaeUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CurriculumVitaeInput) } },
        resolve: (source, args, context, info) => update_1.updateCurriculumVitae(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CurriculumVitae),
    },
    curriculumVitaeCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CurriculumVitaeInput) } },
        resolve: (source, args, context, info) => update_1.createCurriculumVitae(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CurriculumVitae),
    },
};
exports.default = CurriculumVitaeMutations;
//# sourceMappingURL=index.js.map