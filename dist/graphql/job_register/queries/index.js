"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobRegisterQueries = {
    jobRegister: {
        args: types_2.JobRegisterArguments,
        resolve: (source, args, context, info) => get_1.getJobRegister(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobRegister),
    },
    jobRegisters: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobRegisters(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobRegisterConnection),
    }
};
exports.default = jobRegisterQueries;
//# sourceMappingURL=index.js.map