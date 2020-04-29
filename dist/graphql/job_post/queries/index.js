"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const jobPostQueries = {
    jobPost: {
        args: types_2.JobPostArguments,
        resolve: (source, args, context, info) => get_1.getJobPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPost),
    },
    jobPosts: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getJobPosts(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.JobPostConnection),
    }
};
exports.default = jobPostQueries;
//# sourceMappingURL=index.js.map