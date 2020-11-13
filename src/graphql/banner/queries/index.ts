import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getBanner, getBanners } from "../resolvers/get";
import { Banner, BannerArguments, BannerConnection } from "../types";

const bannerQueries = {
    banner: {
        args: BannerArguments,
        resolve: (source, args, context, info) => getBanner(source, args, context, info),
        type: new GraphQLNonNull(Banner),
    },
    banners: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getBanners(source, args, context, info),
        type: new GraphQLNonNull(BannerConnection),
    }
};
export default bannerQueries;