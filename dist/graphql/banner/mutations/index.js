"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const bannerMutations = {
    bannerUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.BannerInput) } },
        resolve: (source, args, context, info) => update_1.updateBanner(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Banner),
    },
    bannerCreate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.BannerInput) } },
        resolve: (source, args, context, info) => update_1.createBanner(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.Banner),
    },
};
exports.default = bannerMutations;
//# sourceMappingURL=index.js.map