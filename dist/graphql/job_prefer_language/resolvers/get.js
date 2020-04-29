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
const JobPreferLanguageRepository_1 = __importDefault(require("../../../db/repositories/JobPreferLanguageRepository"));
const helpers_1 = require("../../helpers");
function getJobPreferLanguage(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let _id = args._id ? args._id : context.jobPreferLanguage._id;
    return JobPreferLanguageRepository_1.default.get(_id, fields)
        .then((jobPreferLanguage) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobPreferLanguage._id,
            vi_title: jobPreferLanguage.vi_title,
            en_title: jobPreferLanguage.en_title,
            vi_slug: jobPreferLanguage.vi_slug,
            en_slug: jobPreferLanguage.en_slug,
            seo_title: jobPreferLanguage.seo_title,
            seo_description: jobPreferLanguage.seo_description,
            created_at: jobPreferLanguage.created_at,
            updated_at: jobPreferLanguage.updated_at,
        };
        return node;
    }));
}
exports.getJobPreferLanguage = getJobPreferLanguage;
function getJobPreferLanguages(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobPreferLanguageRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobPreferLanguages) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobPreferLanguages.length; i++) {
            let jobPreferLanguage = {
                cursor: jobPreferLanguages[i]._id,
                node: {
                    _id: jobPreferLanguages[i]._id,
                    vi_title: jobPreferLanguages[i].vi_title,
                    en_title: jobPreferLanguages[i].en_title,
                    vi_slug: jobPreferLanguages[i].vi_slug,
                    en_slug: jobPreferLanguages[i].en_slug,
                    seo_title: jobPreferLanguages[i].seo_title,
                    seo_description: jobPreferLanguages[i].seo_description,
                    created_at: jobPreferLanguages[i].created_at,
                    updated_at: jobPreferLanguages[i].updated_at,
                }
            };
            edges.push(jobPreferLanguage);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobPreferLanguageRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobPreferLanguages.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobPreferLanguages = getJobPreferLanguages;
//# sourceMappingURL=get.js.map