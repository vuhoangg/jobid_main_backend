"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const communityAnswerQueries = {
    communityAnswer: {
        args: types_2.CommunityAnswerArguments,
        resolve: (source, args, context, info) => get_1.getCommunityAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityAnswer),
    },
    communityAnswers: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCommunityAnswers(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityAnswerConnection),
    }
};
exports.default = communityAnswerQueries;
//# sourceMappingURL=index.js.map