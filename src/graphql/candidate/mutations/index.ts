import {GraphQLNonNull} from "graphql";
import {Candidate, CandidateInput} from "../types";
import {createCandidate, updateCandidate} from "../resolvers/update";

const candidateMutations = {
    candidateUpdate: {
        args: {input: {type: GraphQLNonNull(CandidateInput)}},
        resolve: (source, args, context, info) => updateCandidate(source, args, context, info),
        type: new GraphQLNonNull(Candidate),
    },
    candidateCreate: {
        args: {input: {type: GraphQLNonNull(CandidateInput)}},
        resolve: (source, args, context, info) => createCandidate(source, args, context, info),
        type: new GraphQLNonNull(Candidate),
    },
};
export default candidateMutations;
