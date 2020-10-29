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
const queries_27 = __importDefault(require("./coordinate/queries"));
const queries_28 = __importDefault(require("./geo_code/queries"));
const queries_29 = __importDefault(require("./job_comment/queries"));
const queries_30 = __importDefault(require("./job_comment_reply/queries"));
const queries_31 = __importDefault(require("./job_rating/queries"));
const queries_32 = __importDefault(require("./city/queries"));
const queries_33 = __importDefault(require("./district/queries"));
const queries_34 = __importDefault(require("./ward/queries"));
const queries_35 = __importDefault(require("./facebook_job/queries"));
const queries_36 = __importDefault(require("./company_rating/queries"));
const queries_37 = __importDefault(require("./job_type/queries"));
const queries_38 = __importDefault(require("./candidate/queries"));
const queries_39 = __importDefault(require("./job_apply_other/queries"));
const queries_40 = __importDefault(require("./job_post_wishlist/queries"));
const queries_41 = __importDefault(require("./company_notification_register/queries"));
const QueryRoot = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, queries_1.default), queries_2.default), queries_3.default), queries_4.default), queries_5.default), queries_6.default), queries_3.default), queries_2.default), queries_7.default), queries_4.default), queries_8.default), queries_9.default), queries_10.default), queries_11.default), queries_12.default), queries_13.default), queries_14.default), queries_15.default), queries_16.default), queries_17.default), queries_18.default), queries_19.default), queries_20.default), queries_21.default), queries_22.default), queries_23.default), queries_24.default), queries_25.default), queries_26.default), queries_27.default), queries_28.default), queries_29.default), queries_30.default), queries_31.default), queries_32.default), queries_33.default), queries_34.default), queries_35.default), queries_36.default), queries_37.default), queries_38.default), queries_39.default), queries_40.default), queries_41.default),
    name: "QueryRoot",
});
exports.default = QueryRoot;
//# sourceMappingURL=query.js.map