import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCommunityAnswer, getCommunityAnswers } from "../resolvers/get";
import { CommunityAnswer, CommunityAnswerArguments, CommunityAnswerConnection } from "../types";

const communityAnswerQueries = {
    communityAnswer: {
        args: CommunityAnswerArguments,
        resolve: (source, args, context, info) => getCommunityAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityAnswer),
    },
    communityAnswers: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCommunityAnswers(source, args, context, info),
        type: new GraphQLNonNull(CommunityAnswerConnection),
    }
};
export default communityAnswerQueries;