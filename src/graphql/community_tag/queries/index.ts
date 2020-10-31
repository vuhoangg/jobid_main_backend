import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityTag, getCommunityTags } from "../resolvers/get";
import { CommunityTag, CommunityTagArguments, CommunityTagConnection } from "../types";

const communityTagQueries = {
    communityTag: {
        args: CommunityTagArguments,
        resolve: (source, args, context, info) => getCommunityTag(source, args, context, info),
        type: new GraphQLNonNull(CommunityTag),
    },
    communityTags: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityTags(source, args, context, info),
        type: new GraphQLNonNull(CommunityTagConnection),
    }
};
export default communityTagQueries;