import { GraphQLNonNull } from "graphql";
import { CommunityPost, CommunityPostInput, CommunityPostTrackingBySlug, CommunityPostTrackingBySlugInput } from "../types";
import { createCommunityPost, updateCommunityPost, trackingBySlug } from "../resolvers/update";

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
    communityPostTrackingBySlug: {
        args: { input: { type: GraphQLNonNull(CommunityPostTrackingBySlugInput) } },
        resolve: (source, args, context, info) => trackingBySlug(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostTrackingBySlug),
    }
};
export default communityPostMutations;