"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.WebsiteRole = new graphql_1.GraphQLObjectType({
    name: "WebsiteRole",
    fields: {
        role: { type: graphql_1.GraphQLString },
    },
    description: "Represents the role of an user."
});
exports.RoleArgument = {};
//# sourceMappingURL=index.js.map