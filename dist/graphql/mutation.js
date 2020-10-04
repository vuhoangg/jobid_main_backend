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
const mutations_18 = __importDefault(require("./notification/mutations"));
const mutations_19 = __importDefault(require("./company_feature/mutations"));
const mutations_20 = __importDefault(require("./group_permission/mutations"));
const mutations_21 = __importDefault(require("./client_subcriber/mutations"));
const mutations_22 = __importDefault(require("./service_notification/mutations"));
const mutations_23 = __importDefault(require("./curriculum_vitae/mutations"));
const mutations_24 = __importDefault(require("./job_comment/mutations"));
const mutations_25 = __importDefault(require("./job_comment_reply/mutations"));
const mutations_26 = __importDefault(require("./job_rating/mutations"));
const mutations_27 = __importDefault(require("./city/mutations"));
const mutations_28 = __importDefault(require("./district/mutations"));
const mutations_29 = __importDefault(require("./ward/mutations"));
const mutations_30 = __importDefault(require("./facebook_job/mutations"));
const mutations_31 = __importDefault(require("./company_rating/mutations"));
const mutations_32 = __importDefault(require("./job_type/mutations"));
const mutations_33 = __importDefault(require("./candidate/mutations"));
const mutations_34 = __importDefault(require("./job_apply_other/mutations"));
const Mutation = new graphql_1.GraphQLObjectType({
    fields: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mutations_1.default), mutations_2.default), mutations_3.default), mutations_4.default), mutations_5.default), mutations_6.default), mutations_3.default), mutations_2.default), mutations_7.default), mutations_4.default), mutations_8.default), mutations_9.default), mutations_10.default), mutations_11.default), mutations_12.default), mutations_13.default), mutations_14.default), mutations_15.default), mutations_16.default), mutations_17.default), mutations_18.default), mutations_19.default), mutations_20.default), mutations_21.default), mutations_22.default), mutations_23.default), mutations_24.default), mutations_25.default), mutations_26.default), mutations_27.default), mutations_28.default), mutations_29.default), mutations_30.default), mutations_31.default), mutations_32.default), mutations_33.default), mutations_34.default),
    name: "Mutation",
});
exports.default = Mutation;
//# sourceMappingURL=mutation.js.map