"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const types_1 = require("../types");
const cvEmployerMutations = {
    cvEmployerUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CvEmployerInput) } },
        resolve: (source, args, context, info) => update_1.updateCvEmployer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CvEmployer),
    },
    cvEmployerCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CvEmployerInput) } },
        resolve: (source, args, context, info) => update_1.createCvEmployer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CvEmployer),
    },
};
exports.default = cvEmployerMutations;
//# sourceMappingURL=index.js.map