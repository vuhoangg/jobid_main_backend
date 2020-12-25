import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityPost, getCommunityPosts } from "../resolvers/get";
import { CommunityPost, CommunityPostArguments, CommunityPostConnection } from "../types";

const communityPostQueries = {
    communityPost: {
        args: CommunityPostArguments,
        resolve: (source, args, context, info) => getCommunityPost(source, args, context, info),
        type: CommunityPost,
    },
    communityPosts: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityPosts(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostConnection),
    }
};
export default communityPostQueries;
