"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobApplyOtherQueries = {
    jobApplyOther: {
        args: types_2.JobApplyOtherArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobApplyOther)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApplyOther),
    },
    jobApplyOthers: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobApplyOthers)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobApplyOtherConnection),
    },
};
exports.default = jobApplyOtherQueries;
//# sourceMappingURL=index.js.map