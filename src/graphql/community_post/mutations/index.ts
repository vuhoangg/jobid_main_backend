import { GraphQLNonNull } from "graphql";
import { CommunityPost, CommunityPostInput } from "../types";
import { createCommunityPost, updateCommunityPost } from "../resolvers/update";

const communityPostMutations = {
    communityPostUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityPostInput) } },
        resolve: (source, args, context, info) => updateCommunityPost(source, args, context, info),
        type: new GraphQLNonNull(CommunityPost),
    },
    communityPostCreate: {
        args: { input: { type: GraphQLNonNull(CommunityPostInput) } },
        resolve: (source, args, context, info) => createCommunityPost(source, args, context, info),
        type: new GraphQLNonNull(CommunityPost),
    },
};
export default communityPostMutations;