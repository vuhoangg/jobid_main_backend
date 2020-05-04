"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobSaveQueries = {
    jobSave: {
        args: types_2.JobSaveArguments,
        resolve: (source, args, context, info) => get_1.getJobSave(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobSave),
    },
    jobSaves: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobSaves(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobSaveConnection),
    }
};
exports.default = jobSaveQueries;
//# sourceMappingURL=index.js.map