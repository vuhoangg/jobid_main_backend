"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../types");
const update_1 = require("../resolvers/update");
const userMutations = {
    userUpdate: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.UserInput) } },
        resolve: (source, args, context, info) => update_1.updateUser(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.User),
    },
    userMarkSpam: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.UserInput) } },
        resolve: (source, args, context, info) => update_1.markSpam(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.User),
    },
    userRemoveSpam: {
        args: { input: { type: graphql_1.GraphQLNonNull(types_1.UserInput) } },
        resolve: (source, args, context, info) => update_1.removeSpam(source, args, context, info),
        type: new graphql_1.GraphQLNonNull(types_1.User),
    }
};
exports.default = userMutations;
//# sourceMappingURL=index.js.map