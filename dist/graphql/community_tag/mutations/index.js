"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityTagMutations = {
    communityTagUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityTagInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateCommunityTag)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityTag),
    },
    communityTagCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityTagInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCommunityTag)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityTag),
    },
};
exports.default = communityTagMutations;
//# sourceMappingURL=index.js.map