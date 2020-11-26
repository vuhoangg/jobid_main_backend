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
exports.getCommunityCategorys = exports.getCommunityCategory = void 0;
const CommunityCategoryRepository_1 = __importDefault(require("../../../db/repositories/CommunityCategoryRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityCategory = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityCategory = yield CommunityCategoryRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityCategory._id,
        title: communityCategory.title,
        description: communityCategory.description,
        slug: communityCategory.slug,
        image: communityCategory.image,
        seo_title: communityCategory.seo_title,
        seo_description: communityCategory.seo_description,
        created_at: communityCategory.created_at,
        updated_at: communityCategory.updated_at,
    };
    return node;
});
exports.getCommunityCategorys = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    let communityCategorys = yield CommunityCategoryRepository_1.default.filter(filter, args.limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityCategorys.length; i++) {
        let communityCategory = {
            cursor: communityCategorys[i]._id,
            node: {
                _id: communityCategorys[i]._id,
                title: communityCategorys[i].title,
                slug: communityCategorys[i].slug,
                icon: communityCategorys[i].icon,
                seo_title: communityCategorys[i].seo_title,
                seo_description: communityCategorys[i].seo_description,
                created_at: communityCategorys[i].created_at,
                updated_at: communityCategorys[i].updated_at,
            }
        };
        edges.push(communityCategory);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityCategoryRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityCategorys.length >= args.limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map