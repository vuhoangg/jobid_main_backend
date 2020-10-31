import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityPostLike, getCommunityPostLikes } from "../resolvers/get";
import { CommunityPostLike, CommunityPostLikeArguments, CommunityPostLikeConnection } from "../types";

const communityPostLikeQueries = {
    communityPostLike: {
        args: CommunityPostLikeArguments,
        resolve: (source, args, context, info) => getCommunityPostLike(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostLike),
    },
    communityPostLikes: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityPostLikes(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostLikeConnection),
    }
};
export default communityPostLikeQueries;