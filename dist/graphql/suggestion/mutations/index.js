"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const suggestionMutations = {
    suggestionUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.SuggestionInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateSuggestion)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Suggestion),
    },
    suggestionCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.SuggestionInput) } },
        resolve: (source, args, context, info) => (0, update_1.createSuggestion)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Suggestion),
    },
};
exports.default = suggestionMutations;
//# sourceMappingURL=index.js.map