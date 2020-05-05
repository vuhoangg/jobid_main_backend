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
const BenefitRepository_1 = __importDefault(require("../../../db/repositories/BenefitRepository"));
const helpers_1 = require("../../helpers");
function getBenefit(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return BenefitRepository_1.default.get(args._id, fields)
        .then((benefit) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: benefit._id,
            vi_title: benefit.vi_title,
            en_title: benefit.en_title,
            vi_slug: benefit.vi_slug,
            en_slug: benefit.en_slug,
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
                    vi_title: benefits[i].vi_title,
                    en_title: benefits[i].en_title,
                    vi_slug: benefits[i].vi_slug,
                    en_slug: benefits[i].en_slug,
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