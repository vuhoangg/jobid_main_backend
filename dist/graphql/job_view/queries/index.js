"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobViewQueries = {
    jobView: {
        args: types_2.JobViewArguments,
        resolve: (source, args, context, info) => get_1.getJobView(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobView),
    },
    jobViews: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobViews(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobViewConnection),
    }
};
exports.default = jobViewQueries;
//# sourceMappingURL=index.js.map