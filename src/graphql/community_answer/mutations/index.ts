import { GraphQLNonNull } from "graphql";
import { CommunityAnswer, CommunityAnswerInput } from "../types";
import { createCommunityAnswer, updateCommunityAnswer } from "../resolvers/update";

const communityAnswerMutations = {
    communityAnswerUpdate: {
        args: { input: { type: GraphQLNonNull(CommunityAnswerInput) } },
        resolve: (source, args, context, info) => updateCommunityAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityAnswer),
    },
    communityAnswerCreate: {
        args: { input: { type: GraphQLNonNull(CommunityAnswerInput) } },
        resolve: (source, args, context, info) => createCommunityAnswer(source, args, context, info),
        type: new GraphQLNonNull(CommunityAnswer),
    },
};
export default communityAnswerMutations;