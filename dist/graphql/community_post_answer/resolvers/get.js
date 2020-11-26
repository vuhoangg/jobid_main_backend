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
exports.getCommunityPostAnswers = exports.getCommunityPostAnswer = void 0;
const CommunityPostAnswerRepository_1 = __importDefault(require("../../../db/repositories/CommunityPostAnswerRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityPostAnswer = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityPostAnswer = yield CommunityPostAnswerRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityPostAnswer._id,
        user: communityPostAnswer.user,
        community_post: communityPostAnswer.community_post,
        reply: communityPostAnswer.reply,
        description: communityPostAnswer.description,
        like_count: communityPostAnswer.like_count,
        reply_count: communityPostAnswer.reply_count,
        created_at: communityPostAnswer.created_at,
        updated_at: communityPostAnswer.updated_at,
    };
    return node;
});
exports.getCommunityPostAnswers = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    let communityPostAnswers = yield CommunityPostAnswerRepository_1.default.filter(filter, args.limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityPostAnswers.length; i++) {
        let communityPostAnswer = {
            cursor: communityPostAnswers[i]._id,
            node: {
                _id: communityPostAnswers[i]._id,
                user: communityPostAnswers[i].user,
                community_post: communityPostAnswers[i].community_post,
                reply: communityPostAnswers[i].reply,
                description: communityPostAnswers[i].description,
                like_count: communityPostAnswers[i].like_count,
                reply_count: communityPostAnswers[i].reply_count,
                created_at: communityPostAnswers[i].created_at,
                updated_at: communityPostAnswers[i].updated_at,
            }
        };
        edges.push(communityPostAnswer);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityPostAnswerRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityPostAnswers.length >= args.limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map