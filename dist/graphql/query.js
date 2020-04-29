"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const queries_1 = __importDefault(require("./user/queries"));
const queries_2 = __importDefault(require("./job_skill/queries"));
const queries_3 = __importDefault(require("./job_title/queries"));
const queries_4 = __importDefault(require("./benefit/queries"));
const queries_5 = __importDefault(require("./job_level/queries"));
const queries_6 = __importDefault(require("./job_location/queries"));
const queries_7 = __importDefault(require("./job_category/queries"));
const queries_8 = __importDefault(require("./company/queries"));
const queries_9 = __importDefault(require("./job_prefer_language/queries"));
const queries_10 = __importDefault(require("./suggestion/queries"));
const queries_11 = __importDefault(require("./job_post/queries"));
const queries_12 = __importDefault(require("./activity/queries"));
const QueryRoot = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, queries_1.default), queries_2.default), queries_3.default), queries_4.default), queries_5.default), queries_6.default), queries_3.default), queries_2.default), queries_7.default), queries_4.default), queries_8.default), queries_9.default), queries_10.default), queries_11.default), queries_12.default),
    name: "QueryRoot",
});
exports.default = QueryRoot;
//# sourceMappingURL=query.js.map