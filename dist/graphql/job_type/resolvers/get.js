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
exports.getJobType = getJobType;
exports.getJobTypes = getJobTypes;
const JobTypeRepository_1 = __importDefault(require("../../../db/repositories/JobTypeRepository"));
const helpers_1 = require("../../helpers");
function getJobType(source, args, context, info) {
    const fields = (0, helpers_1.rootField)(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return JobTypeRepository_1.default.getBy(getBy, fields)
        .then((jobType) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobType._id,
            title: jobType.title,
            slug: jobType.slug,
            seo_title: jobType.seo_title,
            seo_description: jobType.seo_description,
            created_at: jobType.created_at,
            updated_at: jobType.updated_at,
        };
        return node;
    }));
}
function getJobTypes(source, args, context, info) {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return JobTypeRepository_1.default.filter(filter, limit, page, infos.edges)
        .then((jobTypes) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobTypes.length; i++) {
            let jobType = {
                cursor: jobTypes[i]._id,
                node: {
                    _id: jobTypes[i]._id,
                    title: jobTypes[i].title,
                    slug: jobTypes[i].slug,
                    seo_title: jobTypes[i].seo_title,
                    seo_description: jobTypes[i].seo_description,
                    created_at: jobTypes[i].created_at,
                    updated_at: jobTypes[i].updated_at,
                }
            };
            edges.push(jobType);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobTypeRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobTypes.length >= limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
//# sourceMappingURL=get.js.map