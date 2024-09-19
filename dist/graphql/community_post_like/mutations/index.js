"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityPostLikeMutations = {
    communityPostLikeUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateCommunityPostLike)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPostLike),
    },
    communityPostLikeCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCommunityPostLike)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPostLike),
    },
    communityPostLikeDelete: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => (0, update_1.deleteCommunityPostLike)(source, args, context, info),
        type: types_1.CommunityPostLike,
    },
};
exports.default = communityPostLikeMutations;
//# sourceMappingURL=index.js.map