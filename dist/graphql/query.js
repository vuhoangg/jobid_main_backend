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
const queries_13 = __importDefault(require("./job_save/queries"));
const queries_14 = __importDefault(require("./job_apply/queries"));
const queries_15 = __importDefault(require("./company_follow/queries"));
const queries_16 = __importDefault(require("./job_alert/queries"));
const queries_17 = __importDefault(require("./job_view/queries"));
const queries_18 = __importDefault(require("./profile_view/queries"));
const queries_19 = __importDefault(require("./notification/queries"));
const queries_20 = __importDefault(require("./company_feature/queries"));
const queries_21 = __importDefault(require("./group_permission/queries"));
const queries_22 = __importDefault(require("./website_role/queries"));
const queries_23 = __importDefault(require("./logout/queries"));
const queries_24 = __importDefault(require("./client_subcriber/queries"));
const queries_25 = __importDefault(require("./service_notification/queries"));
const queries_26 = __importDefault(require("./curriculum_vitae/queries"));
const QueryRoot = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, queries_1.default), queries_2.default), queries_3.default), queries_4.default), queries_5.default), queries_6.default), queries_3.default), queries_2.default), queries_7.default), queries_4.default), queries_8.default), queries_9.default), queries_10.default), queries_11.default), queries_12.default), queries_13.default), queries_14.default), queries_15.default), queries_16.default), queries_17.default), queries_18.default), queries_19.default), queries_20.default), queries_21.default), queries_22.default), queries_23.default), queries_24.default), queries_25.default), queries_26.default),
    name: "QueryRoot",
});
exports.default = QueryRoot;
//# sourceMappingURL=query.js.map