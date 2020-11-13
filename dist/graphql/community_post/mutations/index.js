"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityPostMutations = {
    communityPostUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityPostInput) } },
        resolve: (source, args, context, info) => update_1.updateCommunityPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPost),
    },
    communityPostCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityPostInput) } },
        resolve: (source, args, context, info) => update_1.createCommunityPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPost),
    },
    communityPostTrackingBySlug: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityPostTrackingBySlugInput) } },
        resolve: (source, args, context, info) => update_1.trackingBySlug(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPostTrackingBySlug),
    }
};
exports.default = communityPostMutations;
//# sourceMappingURL=index.js.map