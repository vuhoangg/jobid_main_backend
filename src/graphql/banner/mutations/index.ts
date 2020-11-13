import { GraphQLNonNull } from "graphql";
import { Banner, BannerInput } from "../types";
import { createBanner, updateBanner } from "../resolvers/update";

const bannerMutations = {
    bannerUpdate: {
        args: { input: { type: GraphQLNonNull(BannerInput) } },
        resolve: (source, args, context, info) => updateBanner(source, args, context, info),
        type: new GraphQLNonNull(Banner),
    },
    bannerCreate: {
        args: { input: { type: GraphQLNonNull(BannerInput) } },
        resolve: (source, args, context, info) => createBanner(source, args, context, info),
        type: new GraphQLNonNull(Banner),
    },
};
export default bannerMutations;