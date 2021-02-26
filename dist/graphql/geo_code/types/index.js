"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.DistanceBoundType = new graphql_1.GraphQLObjectType({
    description: "DistanceBound specific resource",
    fields: {
        minLat: { type: graphql_1.GraphQLFloat },
        maxLat: { type: graphql_1.GraphQLFloat },
        minLng: { type: graphql_1.GraphQLFloat },
        maxLng: { type: graphql_1.GraphQLFloat },
    },
    name: "DistanceBoundType",
});
exports.DistanceBoundArgument = {
    lat: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
    lng: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
    range: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
};
//# sourceMappingURL=index.js.map