"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const bannerQueries = {
    banner: {
        args: types_2.BannerArguments,
        resolve: (source, args, context, info) => (0, get_1.getBanner)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.Banner),
    },
    banners: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => (0, get_1.getBanners)(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.BannerConnection),
    }
};
exports.default = bannerQueries;
//# sourceMappingURL=index.js.map