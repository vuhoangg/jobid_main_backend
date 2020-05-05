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
const JobCategoryRepository_1 = __importDefault(require("../../../db/repositories/JobCategoryRepository"));
const helpers_1 = require("../../helpers");
function getJobCategory(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobCategoryRepository_1.default.get(args._id, fields)
        .then((jobCategory) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobCategory._id,
            vi_title: jobCategory.vi_title,
            en_title: jobCategory.en_title,
            vi_slug: jobCategory.vi_slug,
            en_slug: jobCategory.en_slug,
            seo_title: jobCategory.seo_title,
            seo_description: jobCategory.seo_description,
            created_at: jobCategory.created_at,
            updated_at: jobCategory.updated_at,
        };
        return node;
    }));
}
exports.getJobCategory = getJobCategory;
function getJobCategorys(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobCategoryRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobCategorys) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobCategorys.length; i++) {
            let jobCategory = {
                cursor: jobCategorys[i]._id,
                node: {
                    _id: jobCategorys[i]._id,
                    vi_title: jobCategorys[i].vi_title,
                    en_title: jobCategorys[i].en_title,
                    vi_slug: jobCategorys[i].vi_slug,
                    en_slug: jobCategorys[i].en_slug,
                    seo_title: jobCategorys[i].seo_title,
                    seo_description: jobCategorys[i].seo_description,
                    created_at: jobCategorys[i].created_at,
                    updated_at: jobCategorys[i].updated_at,
                }
            };
            edges.push(jobCategory);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobCategoryRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobCategorys.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobCategorys = getJobCategorys;
//# sourceMappingURL=get.js.map