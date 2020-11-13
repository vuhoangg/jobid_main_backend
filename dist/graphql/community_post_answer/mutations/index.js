"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityPostAnswerMutations = {
    communityPostAnswerUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityPostAnswerInput) } },
        resolve: (source, args, context, info) => update_1.updateCommunityPostAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPostAnswer),
    },
    communityPostAnswerCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityPostAnswerInput) } },
        resolve: (source, args, context, info) => update_1.createCommunityPostAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityPostAnswer),
    },
};
exports.default = communityPostAnswerMutations;
//# sourceMappingURL=index.js.map