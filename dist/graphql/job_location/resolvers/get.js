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
const JobLocationRepository_1 = __importDefault(require("../../../db/repositories/JobLocationRepository"));
const helpers_1 = require("../../helpers");
function getJobLocation(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return JobLocationRepository_1.default.getBy(getBy, fields)
        .then((jobLocation) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobLocation._id,
            title: jobLocation.title,
            slug: jobLocation.slug,
            seo_title: jobLocation.seo_title,
            seo_description: jobLocation.seo_description,
            created_at: jobLocation.created_at,
            updated_at: jobLocation.updated_at,
        };
        return node;
    }));
}
exports.getJobLocation = getJobLocation;
function getJobLocations(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobLocationRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobLocations) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobLocations.length; i++) {
            let jobLocation = {
                cursor: jobLocations[i]._id,
                node: {
                    _id: jobLocations[i]._id,
                    vi_title: jobLocations[i].vi_title,
                    en_title: jobLocations[i].en_title,
                    vi_slug: jobLocations[i].vi_slug,
                    en_slug: jobLocations[i].en_slug,
                    seo_title: jobLocations[i].seo_title,
                    seo_description: jobLocations[i].seo_description,
                    created_at: jobLocations[i].created_at,
                    updated_at: jobLocations[i].updated_at,
                }
            };
            edges.push(jobLocation);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobLocationRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobLocations.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobLocations = getJobLocations;
//# sourceMappingURL=get.js.map