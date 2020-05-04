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
const mutations_11 = __importDefault(require("./job_post/mutations"));
const mutations_12 = __importDefault(require("./job_save/mutations"));
const mutations_13 = __importDefault(require("./job_apply/mutations"));
const mutations_14 = __importDefault(require("./company_follow/mutations"));
const mutations_15 = __importDefault(require("./job_alert/mutations"));
const mutations_16 = __importDefault(require("./job_view/mutations"));
const mutations_17 = __importDefault(require("./profile_view/mutations"));
const Mutation = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mutations_1.default), mutations_2.default), mutations_3.default), mutations_4.default), mutations_5.default), mutations_6.default), mutations_3.default), mutations_2.default), mutations_7.default), mutations_4.default), mutations_8.default), mutations_9.default), mutations_10.default), mutations_11.default), mutations_12.default), mutations_13.default), mutations_14.default), mutations_15.default), mutations_16.default), mutations_17.default),
    name: "Mutation",
});
exports.default = Mutation;
//# sourceMappingURL=mutation.js.map