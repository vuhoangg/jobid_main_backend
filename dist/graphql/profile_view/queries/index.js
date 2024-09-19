"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const profileViewQueries = {
    profileView: {
        args: types_2.ProfileViewArguments,
        resolve: (source, args, context, info) => (0, get_1.getProfileView)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ProfileView),
    },
    profileViews: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getProfileViews)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.ProfileViewConnection),
    }
};
exports.default = profileViewQueries;
//# sourceMappingURL=index.js.map