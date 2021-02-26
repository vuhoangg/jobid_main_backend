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
const CommunityPostLikeRepository_1 = __importDefault(require("../../../db/repositories/CommunityPostLikeRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityPostLike = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityPostLike = yield CommunityPostLikeRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityPostLike._id,
        user: communityPostLike.user,
        community_post: communityPostLike.community_post,
        created_at: communityPostLike.created_at,
        updated_at: communityPostLike.updated_at,
    };
    return node;
});
exports.getCommunityPostLikes = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityPostLikes = yield CommunityPostLikeRepository_1.default.filter(filter, limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityPostLikes.length; i++) {
        let communityPostLike = {
            cursor: communityPostLikes[i]._id,
            node: {
                _id: communityPostLikes[i]._id,
                user: communityPostLikes[i].user,
                community_post: communityPostLikes[i].community_post,
                created_at: communityPostLikes[i].created_at,
                updated_at: communityPostLikes[i].updated_at,
            }
        };
        edges.push(communityPostLike);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityPostLikeRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityPostLikes.length >= limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map