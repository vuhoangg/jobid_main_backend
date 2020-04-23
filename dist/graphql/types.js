"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.PageInfo = new graphql_1.GraphQLObjectType({
    description: "Information to aid in pagination.",
    fields: {
        length: { type: graphql_1.GraphQLInt },
        hasNextPage: { type: graphql_1.GraphQLBoolean },
        hasPreviousPage: { type: graphql_1.GraphQLBoolean },
    },
    name: "PageInfo",
});
exports.PaginationArguments = {
    filter: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    limit: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    page: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
};
exports.SpecificArgument = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=types.js.map