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
exports.getCommunityTags = exports.getCommunityTag = void 0;
const CommunityTagRepository_1 = __importDefault(require("../../../db/repositories/CommunityTagRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityTag = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityTag = yield CommunityTagRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityTag._id,
        title: communityTag.title,
        description: communityTag.description,
        slug: communityTag.slug,
        image: communityTag.image,
        seo_title: communityTag.seo_title,
        seo_description: communityTag.seo_description,
        created_at: communityTag.created_at,
        updated_at: communityTag.updated_at,
    };
    return node;
});
exports.getCommunityTags = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityTags = yield CommunityTagRepository_1.default.filter(filter, limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityTags.length; i++) {
        let communityTag = {
            cursor: communityTags[i]._id,
            node: {
                _id: communityTags[i]._id,
                title: communityTags[i].title,
                slug: communityTags[i].slug,
                icon: communityTags[i].icon,
                seo_title: communityTags[i].seo_title,
                seo_description: communityTags[i].seo_description,
                created_at: communityTags[i].created_at,
                updated_at: communityTags[i].updated_at,
            }
        };
        edges.push(communityTag);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityTagRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityTags.length >= limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map