"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityAnswerMutations = {
    communityAnswerUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityAnswerInput) } },
        resolve: (source, args, context, info) => update_1.updateCommunityAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityAnswer),
    },
    communityAnswerCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.CommunityAnswerInput) } },
        resolve: (source, args, context, info) => update_1.createCommunityAnswer(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityAnswer),
    },
};
exports.default = communityAnswerMutations;
//# sourceMappingURL=index.js.map