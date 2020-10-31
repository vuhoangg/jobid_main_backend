"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const communityCategoryQueries = {
    communityCategory: {
        args: types_2.CommunityCategoryArguments,
        resolve: (source, args, context, info) => get_1.getCommunityCategory(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityCategory),
    },
    communityCategorys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCommunityCategorys(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CommunityCategoryConnection),
    }
};
exports.default = communityCategoryQueries;
//# sourceMappingURL=index.js.map