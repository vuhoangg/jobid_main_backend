"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const profileViewMutations = {
    profileViewUpdate: {
        args: { input: { type: (0, graphql_1.GraphQLNonNull)(types_1.ProfileViewInput) } },
        resolve: (source, args, context, info) => (0, update_1.updateProfileView)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.ProfileView),
    },
};
exports.default = profileViewMutations;
//# sourceMappingURL=index.js.map