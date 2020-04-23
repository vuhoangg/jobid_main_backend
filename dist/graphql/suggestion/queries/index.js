"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const suggestionQueries = {
    suggestion: {
        args: types_2.SuggestionArguments,
        resolve: (source, args, context, info) => get_1.getSuggestion(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Suggestion),
    },
    suggestions: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getSuggestions(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.SuggestionConnection),
    }
};
exports.default = suggestionQueries;
//# sourceMappingURL=index.js.map