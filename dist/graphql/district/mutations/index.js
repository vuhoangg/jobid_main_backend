"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const graphql_1 = require("graphql");
const update_1 = require("../resolvers/update");
const districtMutations = {
    district: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.DistrictInput) } },
        resolve: (source, args, context) => update_1.updateDistrict(args, context),
        type: new graphql_1.GraphQLNonNull(types_1.District),
    },
};
exports.default = districtMutations;
//# sourceMappingURL=index.js.map