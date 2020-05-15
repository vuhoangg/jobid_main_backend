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
const JobTitleRepository_1 = __importDefault(require("../../../db/repositories/JobTitleRepository"));
const helpers_1 = require("../../helpers");
function getJobTitle(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return JobTitleRepository_1.default.getBy(getBy, fields)
        .then((jobTitle) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobTitle._id,
            title: jobTitle.title,
            slug: jobTitle.slug,
            seo_title: jobTitle.seo_title,
            seo_description: jobTitle.seo_description,
            created_at: jobTitle.created_at,
            updated_at: jobTitle.updated_at,
        };
        return node;
    }));
}
exports.getJobTitle = getJobTitle;
function getJobTitles(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobTitleRepository_1.default.filter(filter, limit, args.page, infos.edges)
        .then((jobTitles) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobTitles.length; i++) {
            let jobTitle = {
                cursor: jobTitles[i]._id,
                node: {
                    _id: jobTitles[i]._id,
                    title: jobTitles[i].title,
                    slug: jobTitles[i].slug,
                    seo_title: jobTitles[i].seo_title,
                    seo_description: jobTitles[i].seo_description,
                    created_at: jobTitles[i].created_at,
                    updated_at: jobTitles[i].updated_at,
                }
            };
            edges.push(jobTitle);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobTitleRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobTitles.length >= limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobTitles = getJobTitles;
//# sourceMappingURL=get.js.map