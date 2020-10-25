"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobPostMutations = {
    jobPostUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostInput) } },
        resolve: (source, args, context, info) => update_1.updateJobPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPost),
    },
    jobPostCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostInput) } },
        resolve: (source, args, context, info) => update_1.createJobPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPost),
    },
    jobPostTrackingBySlug: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostTrackingBySlugInput) } },
        resolve: (source, args, context, info) => update_1.trackingBySlug(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPostTrackingBySlug),
    }
};
exports.default = jobPostMutations;
//# sourceMappingURL=index.js.map