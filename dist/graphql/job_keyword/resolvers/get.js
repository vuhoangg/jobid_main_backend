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
exports.getJobKeywords = exports.getJobKeyword = void 0;
const JobKeywordRepository_1 = __importDefault(require("../../../db/repositories/JobKeywordRepository"));
const helpers_1 = require("../../helpers");
exports.getJobKeyword = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let jobKeyword = yield JobKeywordRepository_1.default.getBy(getBy, fields);
    if (jobKeyword) {
        let node = {
            _id: jobKeyword._id,
            title: jobKeyword.title,
            slug: jobKeyword.slug,
            keyword: jobKeyword.keyword,
            seo_title: jobKeyword.seo_title,
            seo_description: jobKeyword.seo_description,
            created_at: jobKeyword.created_at,
            updated_at: jobKeyword.updated_at,
        };
        return node;
    }
});
function getJobKeywords(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobKeywordRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobKeywords) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobKeywords.length; i++) {
            let jobKeyword = {
                cursor: jobKeywords[i]._id,
                node: {
                    _id: jobKeywords[i]._id,
                    title: jobKeywords[i].title,
                    slug: jobKeywords[i].slug,
                    keyword: jobKeywords[i].keyword,
                    seo_title: jobKeywords[i].seo_title,
                    seo_description: jobKeywords[i].seo_description,
                    created_at: jobKeywords[i].created_at,
                    updated_at: jobKeywords[i].updated_at,
                }
            };
            edges.push(jobKeyword);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobKeywordRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobKeywords.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobKeywords = getJobKeywords;
//# sourceMappingURL=get.js.map