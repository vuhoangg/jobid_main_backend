import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityPostAnswer, getCommunityPostAnswers } from "../resolvers/get";
import { CommunityPostAnswer, CommunityPostAnswerArguments, CommunityPostAnswerConnection } from "../types";

const communityPostAnswerQueries = {
    communityPostAnswer: {
        args: CommunityPostAnswerArguments,
        resolve: (source, args, context, info) => getCommunityPostAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostAnswer),
    },
    communityPostAnswers: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityPostAnswers(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostAnswerConnection),
    }
};
export default communityPostAnswerQueries;