"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const mutations_1 = __importDefault(require("./user/mutations"));
const mutations_2 = __importDefault(require("./job_skill/mutations"));
const mutations_3 = __importDefault(require("./job_title/mutations"));
const mutations_4 = __importDefault(require("./benefit/mutations"));
const mutations_5 = __importDefault(require("./job_level/mutations"));
const mutations_6 = __importDefault(require("./job_location/mutations"));
const mutations_7 = __importDefault(require("./job_category/mutations"));
const mutations_8 = __importDefault(require("./company/mutations"));
const mutations_9 = __importDefault(require("./job_prefer_language/mutations"));
const mutations_10 = __importDefault(require("./suggestion/mutations"));
const Mutation = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mutations_1.default), mutations_2.default), mutations_3.default), mutations_4.default), mutations_5.default), mutations_6.default), mutations_3.default), mutations_2.default), mutations_7.default), mutations_4.default), mutations_8.default), mutations_9.default), mutations_10.default),
    name: "Mutation",
});
exports.default = Mutation;
//# sourceMappingURL=mutation.js.map