import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getSuggestion, getSuggestions} from "../resolvers/get";
import {Suggestion, SuggestionArguments, SuggestionConnection} from "../types";

const suggestionQueries = {
    suggestion: {
        args: SuggestionArguments,
        resolve: (source, args, context, info) => getSuggestion(source, args, context, info),
        type: new GraphQLNonNull(Suggestion),
    },
    suggestions: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getSuggestions(source, args, context, info),
        type: new GraphQLNonNull(SuggestionConnection),
    }
};
export default suggestionQueries;