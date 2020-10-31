"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const communityPostQueries = {
    communityPost: {
        args: types_2.CommunityPostArguments,
        resolve: (source, args, context, info) => get_1.getCommunityPost(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityPost),
    },
    communityPosts: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCommunityPosts(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityPostConnection),
    }
};
exports.default = communityPostQueries;
//# sourceMappingURL=index.js.map