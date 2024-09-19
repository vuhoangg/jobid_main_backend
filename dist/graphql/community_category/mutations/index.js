"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const communityCategoryMutations = {
    communityCategoryUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityCategoryInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateCommunityCategory)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityCategory),
    },
    communityCategoryCreate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.CommunityCategoryInput) } },
        resolve: (source, args, context, info) => (0, update_1.createCommunityCategory)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.CommunityCategory),
    },
};
exports.default = communityCategoryMutations;
//# sourceMappingURL=index.js.map