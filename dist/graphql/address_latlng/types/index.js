"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.AddressLatLng = new graphql_1.GraphQLObjectType({
    name: "AddressLatLng",
    fields: {
        address: { type: graphql_1.GraphQLString },
        full_address: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    }
});
exports.AddressLatLngArguments = {
    search: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map