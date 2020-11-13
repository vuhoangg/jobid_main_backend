"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const communityPostAnswerQueries = {
    communityPostAnswer: {
        args: types_2.CommunityPostAnswerArguments,
        resolve: (source, args, context, info) => get_1.getCommunityPostAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityPostAnswer),
    },
    communityPostAnswers: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCommunityPostAnswers(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityPostAnswerConnection),
    }
};
exports.default = communityPostAnswerQueries;
//# sourceMappingURL=index.js.map