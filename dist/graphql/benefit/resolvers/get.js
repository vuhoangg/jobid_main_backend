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
exports.getBenefits = exports.getBenefit = void 0;
const BenefitRepository_1 = __importDefault(require("../../../db/repositories/BenefitRepository"));
const helpers_1 = require("../../helpers");
function getBenefit(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return BenefitRepository_1.default.get(args._id, fields)
        .then((benefit) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: benefit._id,
            title: benefit.title,
            slug: benefit.slug,
            seo_title: benefit.seo_title,
            seo_description: benefit.seo_description,
            created_at: benefit.created_at,
            updated_at: benefit.updated_at,
        };
        return node;
    }));
}
exports.getBenefit = getBenefit;
function getBenefits(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return BenefitRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((benefits) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < benefits.length; i++) {
            let benefit = {
                cursor: benefits[i]._id,
                node: {
                    _id: benefits[i]._id,
                    title: benefits[i].title,
                    slug: benefits[i].slug,
                    icon: benefits[i].icon,
                    seo_title: benefits[i].seo_title,
                    seo_description: benefits[i].seo_description,
                    created_at: benefits[i].created_at,
                    updated_at: benefits[i].updated_at,
                }
            };
            edges.push(benefit);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield BenefitRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: benefits.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getBenefits = getBenefits;
//# sourceMappingURL=get.js.map