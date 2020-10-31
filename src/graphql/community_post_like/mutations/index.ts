import { GraphQLNonNull } from "graphql";
import { CommunityPostLike, CommunityPostLikeInput } from "../types";
import { createCommunityPostLike, updateCommunityPostLike } from "../resolvers/update";

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
};
export default communityPostLikeMutations;