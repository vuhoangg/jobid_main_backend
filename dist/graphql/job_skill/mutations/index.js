"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobSkillMutations = {
    jobSkillUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobSkillInput) } },
        resolve: (source, args, context, info) => update_1.updateJobSkill(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobSkill),
    },
    jobSkillCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobSkillInput) } },
        resolve: (source, args, context, info) => update_1.createJobSkill(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobSkill),
    },
};
exports.default = jobSkillMutations;
//# sourceMappingURL=index.js.map