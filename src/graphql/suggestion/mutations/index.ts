import {GraphQLNonNull} from "graphql";
import {Suggestion, SuggestionInput} from "../types";
import {createSuggestion, updateSuggestion} from "../resolvers/update";

const suggestionMutations = {
    suggestionUpdate: {
        args: {input: {type: GraphQLNonNull(SuggestionInput)}},
        resolve: (source, args, context, info) => updateSuggestion(source, args, context, info),
        type: new GraphQLNonNull(Suggestion),
    },
    suggestionCreate: {
        args: {input: {type: GraphQLNonNull(SuggestionInput)}},
        resolve: (source, args, context, info) => createSuggestion(source, args, context, info),
        type: new GraphQLNonNull(Suggestion),
    },
};
export default suggestionMutations;