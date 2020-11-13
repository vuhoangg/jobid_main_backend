import { GraphQLNonNull } from "graphql";
import { CommunityPostLike, CommunityPostLikeInput } from "../types";
import { createCommunityPostLike, deleteCommunityPostLike, updateCommunityPostLike } from "../resolvers/update";

const communityPostLikeMutations = {
    communityPostLikeUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => updateCommunityPostLike(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostLike),
    },
    communityPostLikeCreate: {
        args: { input: { type: GraphQLNonNull(CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => createCommunityPostLike(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostLike),
    },
    communityPostLikeDelete: {
        args: { input: { type: GraphQLNonNull(CommunityPostLikeInput) } },
        resolve: (source, args, context, info) => deleteCommunityPostLike(source, args, context, info),
        type: CommunityPostLike,
    },
};
export default communityPostLikeMutations;