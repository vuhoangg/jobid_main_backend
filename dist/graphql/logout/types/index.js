"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.LogoutType = new graphql_1.GraphQLObjectType({
    description: "Profile logout",
    fields: {
        status: { type: graphql_1.GraphQLBoolean },
    },
    name: "Logout",
});
//# sourceMappingURL=index.js.map