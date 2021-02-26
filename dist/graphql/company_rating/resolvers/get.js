"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRatingRepository_1 = __importDefault(require("../../../db/repositories/CompanyRatingRepository"));
const helpers_1 = require("../../helpers");
function getCompanyRating(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { job_post: args.job_post };
    return CompanyRatingRepository_1.default.getBy(getBy, fields).then((companyRating) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: companyRating._id,
            user: companyRating.user,
            company: companyRating.company,
            rate_value: companyRating.rate_value,
            rate_title: companyRating.rate_title,
            rate_detail: companyRating.rate_detail,
            rate_pros: companyRating.rate_pros,
            rate_cons: companyRating.rate_cons,
            rate_improve: companyRating.rate_improve,
            created_at: companyRating.created_at,
            updated_at: companyRating.updated_at,
        };
        return node;
    }));
}
exports.getCompanyRating = getCompanyRating;
function getCompanyRatings(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return CompanyRatingRepository_1.default.filter(filter, limit, page, infos.edges).then((companyRatings) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < companyRatings.length; i++) {
            let companyRating = {
                cursor: companyRatings[i]._id,
                node: {
                    _id: companyRatings[i]._id,
                    user: companyRatings[i].user,
                    company: companyRatings[i].company,
                    rate_value: companyRatings[i].rate_value,
                    rate_title: companyRatings[i].rate_title,
                    rate_detail: companyRatings[i].rate_detail,
                    rate_pros: companyRatings[i].rate_pros,
                    rate_cons: companyRatings[i].rate_cons,
                    rate_improve: companyRatings[i].rate_improve,
                    created_at: companyRatings[i].created_at,
                    updated_at: companyRatings[i].updated_at,
                },
            };
            edges.push(companyRating);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CompanyRatingRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: companyRatings.length >= limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
exports.getCompanyRatings = getCompanyRatings;
//# sourceMappingURL=get.js.map