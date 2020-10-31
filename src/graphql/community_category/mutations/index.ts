import { GraphQLNonNull } from "graphql";
import { CommunityCategory, CommunityCategoryInput } from "../types";
import { createCommunityCategory, updateCommunityCategory } from "../resolvers/update";

const communityCategoryMutations = {
    communityCategoryUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityCategoryInput) } },
        resolve: (source, args, context, info) => updateCommunityCategory(source, args, context, info),
        type: new GraphQLNonNull(CommunityCategory),
    },
    communityCategoryCreate: {
        args: { input: { type: GraphQLNonNull(CommunityCategoryInput) } },
        resolve: (source, args, context, info) => createCommunityCategory(source, args, context, info),
        type: new GraphQLNonNull(CommunityCategory),
    },
};
export default communityCategoryMutations;