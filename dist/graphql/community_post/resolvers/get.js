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
exports.getCommunityPosts = exports.getCommunityPost = void 0;
const CommunityPostRepository_1 = __importDefault(require("../../../db/repositories/CommunityPostRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityPost = yield CommunityPostRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityPost._id,
        user: communityPost.user,
        title: communityPost.title,
        community_category: communityPost.community_category,
        slug: communityPost.slug,
        community_tag: communityPost.community_tag,
        description: communityPost.description,
        like_count: communityPost.like_count,
        view_count: communityPost.view_count,
        answer_count: communityPost.answer_count,
        status: communityPost.status,
        seo_title: communityPost.seo_title,
        seo_description: communityPost.seo_description,
        created_at: communityPost.created_at,
        updated_at: communityPost.updated_at,
    };
    return node;
});
exports.getCommunityPosts = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    let communityPosts = yield CommunityPostRepository_1.default.filter(filter, args.limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityPosts.length; i++) {
        let communityPost = {
            cursor: communityPosts[i]._id,
            node: {
                _id: communityPosts[i]._id,
                user: communityPosts[i].user,
                title: communityPosts[i].title,
                community_category: communityPosts[i].community_category,
                slug: communityPosts[i].slug,
                community_tag: communityPosts[i].community_tag,
                description: communityPosts[i].description,
                like_count: communityPosts[i].like_count,
                view_count: communityPosts[i].view_count,
                answer_count: communityPosts[i].answer_count,
                status: communityPosts[i].status,
                seo_title: communityPosts[i].seo_title,
                seo_description: communityPosts[i].seo_description,
                created_at: communityPosts[i].created_at,
                updated_at: communityPosts[i].updated_at,
            }
        };
        edges.push(communityPost);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityPostRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityPosts.length >= args.limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map