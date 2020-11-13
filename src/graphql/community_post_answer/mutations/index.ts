import { GraphQLNonNull } from "graphql";
import { CommunityPostAnswer, CommunityPostAnswerInput } from "../types";
import { createCommunityPostAnswer, updateCommunityPostAnswer } from "../resolvers/update";

const communityPostAnswerMutations = {
    communityPostAnswerUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityPostAnswerInput) } },
        resolve: (source, args, context, info) => updateCommunityPostAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostAnswer),
    },
    communityPostAnswerCreate: {
        args: { input: { type: GraphQLNonNull(CommunityPostAnswerInput) } },
        resolve: (source, args, context, info) => createCommunityPostAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityPostAnswer),
    },
};
export default communityPostAnswerMutations;