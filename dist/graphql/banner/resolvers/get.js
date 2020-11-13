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
exports.getBanners = exports.getBanner = void 0;
const BannerRepository_1 = __importDefault(require("../../../db/repositories/BannerRepository"));
const helpers_1 = require("../../helpers");
function getBanner(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return BannerRepository_1.default.get(args._id, fields)
        .then((banner) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: banner._id,
            title: banner.title,
            slug: banner.slug,
            seo_title: banner.seo_title,
            seo_description: banner.seo_description,
            created_at: banner.created_at,
            updated_at: banner.updated_at,
        };
        return node;
    }));
}
exports.getBanner = getBanner;
function getBanners(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return BannerRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((banners) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < banners.length; i++) {
            let banner = {
                cursor: banners[i]._id,
                node: {
                    _id: banners[i]._id,
                    title: banners[i].title,
                    slug: banners[i].slug,
                    icon: banners[i].icon,
                    seo_title: banners[i].seo_title,
                    seo_description: banners[i].seo_description,
                    created_at: banners[i].created_at,
                    updated_at: banners[i].updated_at,
                }
            };
            edges.push(banner);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield BannerRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: banners.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getBanners = getBanners;
//# sourceMappingURL=get.js.map