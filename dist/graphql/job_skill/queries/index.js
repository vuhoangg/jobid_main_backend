"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobSkillQueries = {
    jobSkill: {
        args: types_2.JobSkillArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobSkill)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobSkill),
    },
    jobSkills: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobSkills)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobSkillConnection),
    }
};
exports.default = jobSkillQueries;
//# sourceMappingURL=index.js.map