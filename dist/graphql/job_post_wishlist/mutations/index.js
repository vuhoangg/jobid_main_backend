"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobPostWishlistMutations = {
    jobPostWishlistCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostWishlistInput) } },
        resolve: (source, args, context, info) => update_1.createJobPostWishlist(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPostWishlist),
    },
    jobPostWishlistDelete: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobPostWishlistInput) } },
        resolve: (source, args, context, info) => update_1.deleteJobPostWishlist(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobPostWishlist),
    },
};
exports.default = jobPostWishlistMutations;
//# sourceMappingURL=index.js.map