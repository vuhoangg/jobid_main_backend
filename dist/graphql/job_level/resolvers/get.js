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
const JobLevelRepository_1 = __importDefault(require("../../../db/repositories/JobLevelRepository"));
const helpers_1 = require("../../helpers");
function getJobLevel(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobLevelRepository_1.default.get(args._id, fields)
        .then((jobLevel) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobLevel._id,
            vi_title: jobLevel.vi_title,
            en_title: jobLevel.en_title,
            vi_slug: jobLevel.vi_slug,
            en_slug: jobLevel.en_slug,
            seo_title: jobLevel.seo_title,
            seo_description: jobLevel.seo_description,
            created_at: jobLevel.created_at,
            updated_at: jobLevel.updated_at,
        };
        return node;
    }));
}
exports.getJobLevel = getJobLevel;
function getJobLevels(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobLevelRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobLevels) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobLevels.length; i++) {
            let jobLevel = {
                cursor: jobLevels[i]._id,
                node: {
                    _id: jobLevels[i]._id,
                    vi_title: jobLevels[i].vi_title,
                    en_title: jobLevels[i].en_title,
                    vi_slug: jobLevels[i].vi_slug,
                    en_slug: jobLevels[i].en_slug,
                    seo_title: jobLevels[i].seo_title,
                    seo_description: jobLevels[i].seo_description,
                    created_at: jobLevels[i].created_at,
                    updated_at: jobLevels[i].updated_at,
                }
            };
            edges.push(jobLevel);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobLevelRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobLevels.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobLevels = getJobLevels;
//# sourceMappingURL=get.js.map