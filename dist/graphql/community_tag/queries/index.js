"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const communityTagQueries = {
    communityTag: {
        args: types_2.CommunityTagArguments,
        resolve: (source, args, context, info) => (0, get_1.getCommunityTag)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityTag),
    },
    communityTags: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getCommunityTags)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityTagConnection),
    }
};
exports.default = communityTagQueries;
//# sourceMappingURL=index.js.map