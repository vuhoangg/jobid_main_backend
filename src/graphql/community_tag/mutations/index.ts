import { GraphQLNonNull } from "graphql";
import { CommunityTag, CommunityTagInput } from "../types";
import { createCommunityTag, updateCommunityTag } from "../resolvers/update";

const communityTagMutations = {
    communityTagUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityTagInput) } },
        resolve: (source, args, context, info) => updateCommunityTag(source, args, context, info),
        type: new GraphQLNonNull(CommunityTag),
    },
    communityTagCreate: {
        args: { input: { type: GraphQLNonNull(CommunityTagInput) } },
        resolve: (source, args, context, info) => createCommunityTag(source, args, context, info),
        type: new GraphQLNonNull(CommunityTag),
    },
};
export default communityTagMutations;