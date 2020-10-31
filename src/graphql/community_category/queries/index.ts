import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityCategory, getCommunityCategorys } from "../resolvers/get";
import { CommunityCategory, CommunityCategoryArguments, CommunityCategoryConnection } from "../types";

const communityCategoryQueries = {
    communityCategory: {
        args: CommunityCategoryArguments,
        resolve: (source, args, context, info) => getCommunityCategory(source, args, context, info),
        type: new GraphQLNonNull(CommunityCategory),
    },
    communityCategorys: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityCategorys(source, args, context, info),
        type: new GraphQLNonNull(CommunityCategoryConnection),
    }
};
export default communityCategoryQueries;