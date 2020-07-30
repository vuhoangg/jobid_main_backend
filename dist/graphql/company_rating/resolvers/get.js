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
exports.getCompanyRatings = exports.getCompanyRating = void 0;
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
            rat_value: companyRating.rat_value,
            rat_comment: companyRating.rat_content,
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
    let page = args.page > 50 ? 10 : args.page;
    return CompanyRatingRepository_1.default.filter(filter, args.limit, page, infos.edges).then((companyRatings) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < companyRatings.length; i++) {
            let companyRating = {
                cursor: companyRatings[i]._id,
                node: {
                    _id: companyRatings[i]._id,
                    user: companyRatings[i].user,
                    company: companyRatings[i].job,
                    rat_value: companyRatings[i].rat_value,
                    rat_comment: companyRatings[i].rat_comment,
                    created_at: companyRatings[i].created_at,
                    updated_at: companyRatings[i].updated_at,
                },
            };
            edges.push(companyRating);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CompanyRatingRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: companyRatings.length >= args.limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
exports.getCompanyRatings = getCompanyRatings;
//# sourceMappingURL=get.js.map