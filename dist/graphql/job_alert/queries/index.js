"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobAlertQueries = {
    jobAlert: {
        args: types_2.JobAlertArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobAlert)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobAlert),
    },
    jobAlerts: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getJobAlerts)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobAlertConnection),
    }
};
exports.default = jobAlertQueries;
//# sourceMappingURL=index.js.map