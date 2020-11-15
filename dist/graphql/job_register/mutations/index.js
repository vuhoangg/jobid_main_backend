"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobRegisterMutations = {
    jobRegisterUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobRegisterInput) } },
        resolve: (source, args, context, info) => update_1.updateJobRegister(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobRegister),
    },
    jobRegisterCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobRegisterInput) } },
        resolve: (source, args, context, info) => update_1.createJobRegister(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobRegister),
    },
};
exports.default = jobRegisterMutations;
//# sourceMappingURL=index.js.map