import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getCandidate, getCandidates} from "../resolvers/get";
import {Candidate, CandidateArguments, CandidateConnection} from "../types";

const candidateQueries = {
    candidate: {
        args: CandidateArguments,
        resolve: (source, args, context, info) => getCandidate(source, args, context, info),
        type: new GraphQLNonNull(Candidate),
    },
    candidates: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCandidates(source, args, context, info),
        type: new GraphQLNonNull(CandidateConnection),
    }
};
export default candidateQueries;
