"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const districtQueries = {
    district: {
        args: types_2.DistrictArguments,
        resolve: (source, args, context, info) => get_1.getDistrict(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.District),
    },
    districts: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getDistricts(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.DistrictConnection),
    },
};
exports.default = districtQueries;
//# sourceMappingURL=index.js.map