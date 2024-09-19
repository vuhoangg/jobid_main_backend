"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutation_1 = __importDefault(require("./graphql/mutation"));
const query_1 = __importDefault(require("./graphql/query"));
const AppSchema = new graphql_1.GraphQLSchema({
    mutation: mutation_1.default,
    query: query_1.default,
    // If you need to create or update a data source,
    // you use mutations. Note:
    // mutations will not be explored in this post.
});
exports.default = AppSchema;
//# sourceMappingURL=schema.js.map