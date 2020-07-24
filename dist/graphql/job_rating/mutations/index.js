"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const jobRatingMutations = {
    jobRatingCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobRatingInput) } },
        resolve: (source, args, context, info) => update_1.createJobRating(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobRating),
    },
    jobRatingUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.JobRatingInput) } },
        resolve: (source, args, context, info) => update_1.updateJobRating(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.JobRating),
    },
};
exports.default = jobRatingMutations;
//# sourceMappingURL=index.js.map