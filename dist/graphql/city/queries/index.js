"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const get_1 = require("../resolvers/get");
const types_2 = require("../types");
const cityQueries = {
    city: {
        args: types_2.CityArguments,
        resolve: (source, args, context, info) => get_1.getCity(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CityType),
    },
    citys: {
        args: types_1.PaginationArguments,
        resolve: (source, args, context, info) => get_1.getCitys(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_2.CityConnection),
    },
};
exports.default = cityQueries;
//# sourceMappingURL=index.js.map